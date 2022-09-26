// import mysql
const mysql = require('mysql2');


// create connection
const conx = mysql.createConnection({
        host: 'localhost', 
        user: 'employee_tracker', 
        password: 'password',
        database: 'employees_db'
    });

module.exports = conx;