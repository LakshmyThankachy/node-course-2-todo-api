//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');
var obj=new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    return console.log('not Connected to mongodb');
  }
  console.log('Connected to Mongodb Server');
  const db=client.db('TodoApp')

  db.collection('Todos').insertOne({
    text:'Shopping',
    completed:false
  },(err,result)=>{
    if(err){
      return console.log('Not added to db',err)
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });


  db.collection('Users').insertOne({

    name:'Lakshmy',
    age:38,
    location:'kochi'
  },(err,result)=>{
    if(err){
      return console.log('Not inserted into Users collection',err)
    }
    console.log(JSON.stringify(result.ops,undefined,2));
    console.log(result.ops[0]._id.getTimestamp())
  })
  client.close();
})
