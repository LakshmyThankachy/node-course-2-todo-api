var mongoose=require('mongoose')

module.exports={mongoose:mongoose}
mongoose.Promise=global.Promise
mongoose.connect("mongodb://localhost:27017/TodoApp");

//module.exports={mongoose}
