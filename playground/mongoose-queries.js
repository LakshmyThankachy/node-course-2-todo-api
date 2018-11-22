const {ObjectId}=require('mongodb')
const {mongoose}=require('./../server/db/mongoose')
const {Todo}=require('./../server/models/todo')
const {User}=require('./../server/models/user')

// var id='5bf53a1bfa0a740720e0b600we'
// if(!ObjectId.isValid(id)){
//   console.log('Id is not valid')
// }

// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log("TodosbyFind",todos)
// })
//
// Todo.findOne({_id:id}).then((todos)=>{
//   console.log("TodosByFindOne",todos)
// })


// Todo.findById({_id:id}).then((todos)=>{
//   if(!todos){
//     return console.log('Id not found')
//   }
//   console.log("TodosByFindebyid",todos)
// }).catch((e)=>{
//   console.log(e)
// })

var userid='5beeaa9e855eaa26c4ea822d'
User.findById({_id:userid}).then((user)=>{
  if(!user){
    return console.log('Userid not found');
  }
  console.log(JSON.stringify(user,undefined,2));
}).catch((e)=>{
  console.log(e)
})
