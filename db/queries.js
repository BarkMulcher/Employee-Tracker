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
        `SELECT employee.id,
        CONCAT(employee.first_name, " ", employee.last_name) AS name,
        roles.title,
        department.department_name AS department,
        roles.salary
        FROM employee, roles, department
        WHERE employee.role_id = roles.id AND roles.department_id = department.id
        ORDER BY employee.id ASC;`

    )

    console.table(rows);
    } catch (err) {
        console.log(err);
        questions();
    }
}

addEmployee = async () => {
    const conx = await databaseConx();

    const roles = await conx.query(
        `SELECT * FROM roles`
    );

    const managers = await conx.query(
        `SELECT * FROM employee 
         WHERE employee.manager_id IS NULL`
    );

    const roleChoice = await 
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: `What is the new employee's first name?`
            },
            {
                type: 'input',
                name: 'lastName',
                message: `What is the new employee's last name?`
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What role ID will this employee have?',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
            },
            {
                type: 'list',
                name: 'empMgrId',
                message: `Who will be this employee's manager?`,
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                })
            }
    ])

    console.table(managers);


}

// updateSingleRole = async () => {
//     const conx = await databaseConx();

//     const rows = await conx.query(
//         ``
//     )
// }

getRoster = async () => {
    const conx = await databaseConx();

    const [rows] = await conx.query(
        `SELECT * FROM roles
        ORDER BY id ASC;`
    );

    console.table(rows);
}

module.exports = {
    rollCall,
    addEmployee,
    // updateSingleRole,
    getRoster
}