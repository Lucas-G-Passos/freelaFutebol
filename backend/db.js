import mysql from 'mysql2/promise';
// import { configDotenv } from 'dotenv';
// configDotenv();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'fut3',
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
});

export default db;