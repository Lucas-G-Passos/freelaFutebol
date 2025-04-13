import mysql from 'mysql2/promise';
import { configDotenv } from 'dotenv';
configDotenv();

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
    charset: 'utf8mb4_unicode_ci', // Combined charset and collation
    timezone: 'local',
});


export default db;