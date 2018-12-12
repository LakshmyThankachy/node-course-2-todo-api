var mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const _  =require('lodash')
var UserSchema=new mongoose.Schema({

    email:{
      type:String,
      required:true,
      trim:true,
      minLength:1,
      unique:true,
      validate:{
        validator:(value)=>{
          return validator.isEmail(value);
        },
        message:'{VALUE} is not a valid email'
      }
    },
    password:{
      type:String,
      required:true,
      minLength:6
    },
    tokens:[{
      access:{
        type:String,
        required:true
      },
      token:{
        type:String,
        required:true
      }
    }]
  })

//Instance Methods-gets called with document
UserSchema.methods.generateAuthToken=function (){
  console.log("generateAuthToken")
  var user=this;
  var access='auth';
  var token = jwt.sign({_id: user._id.toHexString(),email:user.email,password:user.password,access}, '123abcd').toString();
  user.tokens.push({access,token})

  return user.save().then(()=>{
    /*console.log("tokens generateAuthToken",)
    console.log(token)

    decoded=jwt.verify(token,'123abcd');*/
    //console.log('email',decoded.email)

    return token;
  });

  // return new Promise((resolve, reject) => {
  //   const user = this;
  //   const access = 'auth';
  //
  //   const token = jwt.sign({_id: user._id.toHexString(), access}, 'abs123').toString();
  //
  //   resolve({access, token});
//});

}

UserSchema.statics.findByToken = function(token){
  var User=this;
  var decoded;
  console.log(token)
  try{
    decoded=jwt.verify(token,'123abcd');
    console.log('email',decoded.email)
  }catch(e){
  /*  return new Promise((resolve,reject)=>{
      reject();*/
      return Promise.reject();
    }


  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  })
}

var User=mongoose.model('User',UserSchema);

module.exports={User}
