const inquirer = require('inquirer');
const chalk = require('chalk');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




const questions = async () => {
    await inquirer.prompt ([
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
                }
            ]
        }
    ])
    if (value === 'all_employees') {
        
    }
}


const init = () => {
    main();
    questions();
}

init();

