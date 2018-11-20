
var express=require('express')
var bodyParser=require('body-parser')

var {mongoose}=require('./db/mongoose.js')
var {Todo}=require('./models/todo.js')
var {User}=require('./models/user.js')



var app = express();
app.use(bodyParser.json())
app.post('/todos',(req,res)=>{
  console.log(req.body)
  var todo = new Todo({
    text:req.body.text
  })
  todo.save().then((doc)=>{
    res.send(doc)
  },(er)=>{
    res.status(400).send(er)
  })
})
app.listen(3000,()=>{
  console.log('Listening to 3000')
})
// var newTodo1= new Todo({text:"Shopping",completed:false,completedAt:23})
//
// newTodo1.save().then((doc)=>{
//   console.log(doc)
// },(e)=>{
//   console.log(e)
// })
//
// var newUser=new User({email:"jay@gmail.com"})
// newUser.save().then((doc)=>{
//   console.log("User documern ",doc)
// },(err)=>{
//   console.log(err)
// })
