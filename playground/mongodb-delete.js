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

    // db.collection('Users').find({name:'Lakshmy'}).count().then((count)=>{
    //   console.log(`Documents Counted : ${count}`)
    // },(err)=>{
    //   console.log("Couldnt find")
    // })
// db.collection('Todos').deleteMany({text:'Lunch'}).then((result)=>{
//   console.log(result);
// });
// db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((result)=>{
//   console.log(result);
// });
 db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
   console.log(result);
 });


db.collection('Users').deleteMany({name:'Lakshmy'}).then((result)=>{
  console.log(result);
});
db.collection('Todos').findOneAndDelete({_id:new ObjectID("5bebc486793eed047c09a0a4")}).then((result)=>{
  console.log(JSON.stringify(result,undefined,2));
});

  client.close();
})
