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

  db.collection('Todos').findOneAndUpdate(
    {
      _id:new ObjectID("5bee6e787d09361a287c7197")
    },
    {
      $set :{completed:true}
    },
    {
      returnOriginal:false
    }).then((result)=>{
    console.log(result);
  })

  db.collection('Users').findOneAndUpdate(
    {
      _id:new ObjectID("5bee6e787d09361a287c7198")
    },
    {
      $set:{name:"Jay"},$inc:{age:1}
    },
    {
      returnOriginal:false
    }
  ).then((result)=>{
    console.log(result)
  })
  client.close();
})
