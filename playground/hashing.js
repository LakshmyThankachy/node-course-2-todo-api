const {SHA256}=require('crypto-js')
const jwt=require ('jsonwebtoken')

var data={
  id:10
}

var token = jwt.sign(data,'123abc')
var decoded=jwt.verify(token,'123abc')

console.log(token)
console.log(decoded)
//

// var msg="I am 38 years oldqwe"
// var hash=SHA256(msg).toString()
//
// console.log(`Message: ${msg}`)
// console.log(`Hash String: ${hash}`)
//
//
// var data={
//     id:5
// }
//
// var token={
//   data,
//   hash:SHA256(JSON.stringify(data)+'some').toString()
// }
//
// var resulthash=SHA256(JSON.stringify(token.data) + 'some').toString()
//
// if(token.hash === resulthash){
//   console.log('Data is not changed')
// }else{
//   console.log('Data is  changed')
// }
