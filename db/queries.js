const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const chalk = require('chalk');
const conx = require('./database');
const queries = require('../index');


databaseConx = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'employee_tracker',
        password: 'password',
        database: 'employees_db'
    });
}

rollCall = async () => {
    try {
    const conx = await databaseConx();

    const [rows] = await conx.query(
        `SELECT * FROM employee
        ORDER BY name ASC;`
    )

    console.table(rows);
    } catch (err) {
        console.log(err);
        questions();
    }
}

// change to editRoll and add emp removal options
addEmployee = async () => {
    const conx = await databaseConx();

    const roles = await conx.query(
        `SELECT * FROM roles`
    );

    const managers = await conx.query(
        `SELECT * FROM employee 
         WHERE employee.manager IS NULL`
    );

    console.table(managers);


}

updateSingleRole = async () => {
    const conx = await databaseConx();

    const rows = await conx.query(
        ``
    )
}

getRoster = async () => {
    const conx = await databaseConx();

    const [rows] = await conx.query(
        `SELECT * FROM roles
        ORDER BY id ASC;`
    );

    console.table(rows);
    
    queries;
}

module.exports = {
    rollCall,
    addEmployee,
    updateSingleRole,
    getRoster
}