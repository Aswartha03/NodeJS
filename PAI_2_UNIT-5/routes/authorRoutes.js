let express = require ('express');
const AuthorModel = require ('../models/authorModel');
const authMiddleware = require ('../middlewares/authMiddleware');
let authorRouter = express.Router ();
let redis = require ('../configs/redis');
const BookModel = require ('../models/bookModel');
// add author
authorRouter.post (
  '/',
  authMiddleware (['editor', 'admin']),
  async (req, res) => {
    try {
      let {name, gender} = req.body;
      redis.del ('authors');
      let author = await AuthorModel.create ({name, gender});
      res.status (201).json ({message: 'Author created', author});
    } catch (error) {
      res.status (500).json ({message: error.message});
    }
  }
);
// get authors
authorRouter.get (
  '/',
  authMiddleware (['admin', 'editor']),
  async (req, res) => {
    try {
      let authors = await redis.get ('authors');
      if (!authors) {
        let authorsFromDb = await AuthorModel.find ();
        redis.set ('authors', JSON.stringify (authorsFromDb));
        res
          .status (200)
          .json ({message: 'authors from Db', authors: authorsFromDb});
      }
      authors = JSON.parse (authors);
      res
        .status (200)
        .json ({message: 'authors from Redis', authors}, {Ex: 300});
    } catch (error) {
      res.status (500).json ({message: error.message});
    }
  }
);
// delete author by id
authorRouter.delete (
  '/:id',
  authMiddleware (['admin', 'editor']),
  async (req, res) => {
    try {
      let {id} = req.params;
      if (!id) {
        return res.status (400).json ({message: 'id required'});
      }
      let author = await AuthorModel.findById (id);
      if (!author) {
        return res.status (404).json ({message: 'author is not found'});
      }
      await BookModel.updateMany ({author: id}, {$set: {isDeleted: true}});
      redis.del ('books');
      redis.del ('authors');
      author.isDeleted = true;
      await author.save ();
      res
        .status (200)
        .json ({message: 'author deleted', deletedAuthor: author});
    } catch (error) {
      res.status (500).json ({message: error.message});
    }
  }
);
module.exports = authorRouter;
