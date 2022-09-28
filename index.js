const inquirer = require('inquirer');
const chalk = require('chalk');
const mysql = require('mysql2/promise');
const queries = require('./db/queries');

// create connection to MySQL
databaseConx = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'employee_tracker',
        password: 'password',
        database: 'employees_db'
    });
};

console.table(
    chalk.bgCyan
        (`
    ███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
    ██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
    █████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
    ██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
    ███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
    ╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝
    
    ████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗░
    ╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗
    ░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝
    ░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗
    ░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║
    ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝`)
)


const questions = async () => {
    try {
        const response = await inquirer.prompt([
            {
                type: 'list',
                name: 'actions',
                message: chalk.greenBright('What would you like to do?'),
                choices: [
                    {
                        value: "all_employees",
                        name: 'View All Employees'
                    },
                    {
                        value: "add_employee",
                        name: 'Add Employee'
                    },
                    {
                        value: 'update_employee_role',
                        name: 'Update Employee Role'
                    },
                    {
                        value: 'view_all_roles',
                        name: 'View All Roles'
                    },
                    {
                        value: 'add_role',
                        name: 'Add Role'
                    },
                    {
                        value: 'view_all_departments',
                        name: 'View All Departments'
                    },
                    {
                        value: 'add_department',
                        name: 'Add Department'
                    },
                    {
                        value: 'exit',
                        name: 'Exit'
                    }
                ]
            }
        ])
        switch (response.actions) {
            case 'all_employees':
                await queries.rollCall();
                questions();
                break;

            case 'add_employee':
                await queries.addEmployee();
                questions();
                break;

            case 'update_employee_role':
                await queries.updateSingleRole();
                questions();
                break;

            case 'view_all_roles':
                await getRoster();
                questions();
                break;
        };
    } catch (err) {
        console.log(err);
        questions();
    };

}

questions();


module.exports = questions;