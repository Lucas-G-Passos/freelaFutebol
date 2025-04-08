import bcrypt from 'bcrypt';

const salt = 10 

let username = await bcrypt.hash('Admin',salt)
var password = await bcrypt.hash("passos209009",salt)

console.log(username+' '+password)