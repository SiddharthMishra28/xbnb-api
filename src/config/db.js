const mysql = require('mysql2');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('dotenv').config().parsed;

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

module.exports = pool.promise();