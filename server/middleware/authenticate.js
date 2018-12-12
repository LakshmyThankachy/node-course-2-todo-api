var {User}=require('./../models/user.js')


var authenticate = (req,res,next)=>{
  var token=req.header('x-auth')
 console.log('Inside authenticate',token);
  User.findByToken(token).then((user)=>{
    if(!user){
      return Promise.reject();
    }
   //res.send(user)
   req.user=user;
   req.token=token;
   console.log('nside findbytoken',token,req.user);
   next();
  }).catch((e)=>{
    res.status(401).send();
  });

}

module.exports={authenticate}
