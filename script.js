const inquirer = require('inquirer');



const questions = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'actions',
            message: 'What would you like to do?',
            choices: ['View All Employees',
                        'Add Employee',
                        'Update Employee Role',
                        'View All Roles',
                        'Add Role',
                        'View All Departments',
                        'Add Department',
                        'ETC...']
        }
    ])
}

const init = () => {
    questions();
}

init();