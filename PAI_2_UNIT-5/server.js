let express = require ('express');
const connectToDb = require ('./configs/db');
let redis = require ('../PAI_2_UNIT-5/configs/redis');
let app = express ();
app.use (express.json ());

require ('dotenv').config ();
connectToDb ();

const userRouter = require ('./routes/userRoutes');
const bookRouter = require ('./routes/bookRoutes');
const authorRouter = require ('./routes/authorRoutes');
// var token = jwt.sign({ foo: 'bar' }, process.env.JWT_SECURITY_KEY)

let PORT = process.env.PORT || 3000;

// test route
app.get ('/test', (req, res) => {
  res.status (200).json ({message: 'Test Route is Working'});
});

app.use ('/api/v1/auth', userRouter);
app.use ('/api/v1/books', bookRouter);
app.use ('/api/v1/authors', authorRouter);

// unhandled route
app.use ((req, res) => {
  res.status (404).json ({message: '404 , Route is Not Found'});
});

app.listen (PORT, () => {
  console.log (`Server is Running on the ${PORT} port`);
});
