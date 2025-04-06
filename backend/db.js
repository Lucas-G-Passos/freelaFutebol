import mysql from 'mysql2/promise';

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