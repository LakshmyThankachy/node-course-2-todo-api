//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

//var obj=new ObjectID();
//console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    return console.log('not Connected to mongodb');
  }
  console.log('Connected to Mongodb Server');
  const db=client.db('TodoApp')

  // db.collection('Todos').find({_id:new ObjectID('5bed10cf89ba923630bd2a8e')}).toArray().then((docs)=>{
  //   console.log(JSON.stringify(docs,undefined,2))
  // },(err)=>{
  //   console.log("Couldnt find")
  // })

  // db.collection('Todos').find().count().then((count)=>{
  //   console.log(`Document Count : ${count}`)
  // },(err)=>{
  //   console.log("Couldnt find the count")
  // })

  db.collection('Users').find({name:'Lakshmy'}).count().then((count)=>{
    console.log(`Documents Counted : ${count}`)
  },(err)=>{
    console.log("Couldnt find")
  })

  client.close();
})
