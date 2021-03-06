//todo//user//app to be expored

const expect=require('expect')
const request=require('supertest')

const {app}=require('./../server')
const {Todo}=require('./../models/todo')
const {User}=require('./../models/user')
const {ObjectId}=require('mongodb')
const todoArray = [{
  _id:new ObjectId,
  text: 'First test todo'
}, {
  _id:new ObjectId,
  text: 'Second test todo',
  completed: true,
  completedAt:333
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(todoArray);
  }).then(() => done());
});


describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
   request(app)
     .post('/todos')
     .send({})
     .expect(400)
     .end((err, res) => {
       if (err) {
         return done(err);
       }

       Todo.find().then((todos) => {
         expect(todos.length).toBe(2);
         done();
       }).catch((e) => done(e));

      })

      })

  })


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe('Get /todos/:id' ,()=>{
  it('should get  todos with id',(done)=>{
    request(app)
      .get(`/todos/${todoArray[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.text).toBe(todoArray[0].text)
      })
      .end(done)
  })

  it('should return 404 if todo not found',(done)=>{
      var id=new ObjectId().toHexString();
      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        // .expect((res)=>{
        //   expect(res.body.todos).toBeNull()
        // })
        //
         .end(done);
  })


  it('should return 404 if nonobject ids',(done)=>{
      request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
  })
})




describe('DELETE /todo/:id',()=>{

  it('Should return 404 if todo not found',(done)=>{
    var todoIdvar=new ObjectId().toHexString()
  request(app)
    .delete(`/todos/${todoIdvar}`)
    .expect(404)
    .end(done);
  })

  it('Should return 404 if objectid is invalid',(done)=>{
  //  var todoId=new ObjectId().toHexString()
  request(app)
    .delete('/todos/abc123')
    .expect(404)
    .end(done);

  })

    it('Should remove todo with ID',(done)=>{
        var todoId=todoArray[1]._id.toHexString()

      request(app)
        .delete(`/todos/${todoId}`)
        .expect(200)
        // .expect((res)=>{
        //   expect(res.body.todo._id).toBe(todoId)
        // })
    //  .end(done);
      .end((err,res)=>{
        if(err)
          return done(err);
      });
       Todo.findById(todoId).then((todo)=>{
        expect(todo.todoId).toNotExist();
        done();
      }).catch((e)=>{
        done(e);
      })
  })


})

describe('PATCH todo/:id',()=>{
  it('should update todo/:id',(done)=>{
    var todoId=todoArray[0]._id.toHexString()
  
    var text='Updatingtest'
    request(app)
      .patch(`/todos/${todoId}`)
      .send({
        text:text ,
        completed:true
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  })

  it('should patch todo/:id with complete',(done)=>{
    var todoId=todoArray[1]._id.toHexString()

    var text='Updatingtesttofalse'
    request(app)
      .patch(`/todos/${todoId}`)
      .send({
        text:text ,
        completed:false
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  })

})
