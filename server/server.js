const _=require('lodash')
const express=require('express')
const bodyParser=require('body-parser')
const {ObjectId}=require('mongodb')

var {mongoose}=require('./db/mongoose.js')
var {Todo}=require('./models/todo.js')
var {User}=require('./models/user.js') //model name
var {authenticate}=require('./middleware/authenticate.js')

const port=process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json())

app.post('/todos',(req,res)=>{

  var todo = new Todo({
    text:req.body.text
  })
  todo.save().then((doc)=>{
    res.send(doc)
  },(er)=>{
    res.status(400).send(er)
  })
})

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send(todos)
  },(e)=>{
    res.sendStatus(400).send(e)
  })
})

app.get('/todos/:id',(req,res)=>{
  var id =req.params.id;
  if(!ObjectId.isValid(id)){
    return res.sendStatus(404).send({})
  }
  Todo.findById(id).then((todos)=>{
    if(!todos){
      return res.sendStatus(404).send({})
    }
     res.send({todos})
    }).catch((e)=>{
     res.status(400).send({})
  })
})

app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id

  if(!ObjectId.isValid(id)){
    return res.sendStatus(404).send();
  }
  Todo.findByIdAndRemove(id).then((doc)=>{
    if(!doc){
      return res.sendStatus(404).send();
    }
     res.sendStatus(200).send(doc)

  }).catch((e)=>{
    res.sendStatus(400).send({})
  })
})

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);

  if(!ObjectId.isValid(id)){
    return res.status(400).send({})
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime()
  }else{
    body.completed=false
    body.completedAt=null
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(400).send({})
    }
    res.send({todo})
  }).catch((e)=>{
    res.sendStatus(400).send({})
  })
})


//USERS DATABASE

// app.post('/users/',(req,res)=>{
//   var body=_.pick(req.body,['email','password'])
//   var user=new User({
//     email:body.email,
//     password:body.password
//   })
//   user.save().then((doc)=>{
//     return res.send(doc)
//   }).catch((err)=>{
//     return res.status(404).send(err);
//   })
//
// })

//
app.post('/users/',(req,res)=>{
  var body=_.pick(req.body,['email','password'])
  var user=new User(body) //so email and password is copied to user 

  user.save().then((doc)=>{
    console.log("hello")
    return user.generateAuthToken(); //Instance method is called with the document ie user document
  //  return res.send(doc)
}).then((token)=>{
   res.header('x-auth',token).send(user)
}).catch((err)=>{
    return res.status(404).send(err);
  })

})

//give the token and get the email and password
app.get('/users/me/',authenticate,(req,res)=>{
   res.send(req.user)
})


app.listen(port,()=>{
  console.log(`Listening to ${port}`)
})

module.exports={app}
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
