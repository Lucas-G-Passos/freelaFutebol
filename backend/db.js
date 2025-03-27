const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db,
    waitForConnections: true,
    connectionLimit:15,
    queueLimit:0,
});


module.exports = db;