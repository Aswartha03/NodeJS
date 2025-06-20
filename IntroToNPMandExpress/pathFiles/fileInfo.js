let path = require("path")

function readFile(filePath){
    return {
        fileName : path.basename(filePath) ,
        extension : path.extname(filePath) ,
        directory : path.dirname(filePath)
    }
}


module.exports = readFile