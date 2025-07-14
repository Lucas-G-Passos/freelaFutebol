import bcrypt from 'bcrypt';

const salt = 10 

let username = 'juan'
var password = await bcrypt.hash("10",salt)

console.log(username+' '+password)