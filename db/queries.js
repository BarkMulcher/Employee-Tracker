const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const chalk = require('chalk');
const conx = require('./database');
// const queries = require('../index');


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
    try {
        console.log(chalk.underline.bgRed.bold(`Add New Employee \n`));

        const conx = await databaseConx();

        const [roles] = await conx.query(
            `SELECT * FROM roles`
        );


        const [managers] = await conx.query(
            `SELECT * FROM employee 
         WHERE employee.manager_id IS NULL`
        );


        console.table(roles);
        console.table(managers);

        const response = await inquirer.prompt([
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
                choices: roles.map(role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            },
            {
                type: 'list',
                name: 'empMgrId',
                message: `Who will be this employee's manager?`,
                choices: managers.map(manager => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                })
            }

        ])

        let result = await conx.query(
            `INSERT INTO employee SET ?`,
            {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.roleId,
                manager_id: response.empMgrId
            }
        );

        console.log(`${response.firstName} ${response.lastName} has been added successfully.`)

    } catch (err) {
        console.log(err);
    }


}

updateSingleRole = async () => {
    try {
        const conx = await databaseConx();

        const [employee] = await conx.query(
            `SELECT * FROM employee`
        );

        const updateChoice = employee.map(employeeName => {
            return {
                name: employeeName.first_name + ' ' + employeeName.last_name,
                value: employeeName.id
            }
        })

        console.table(employee);
        let employeeResponse = await
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Choose an employee to update.',
                    choices: updateChoice
                }
            ]);

        const [roles] = await conx.query(
            `SELECT * FROM roles`
        );

        const updateRole = roles.map(employeeRole => {
            return {
                name: employeeRole.title,
                value: employeeRole.id
            }
        })

        console.table(roles);
        let roleResponse = await
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select the new role applicable to the employee.',
                    choices: updateRole
                }
            ])

        let result = await conx.query(
            `UPDATE employee SET ? WHERE ?`,
            [
                { role_id: roleResponse.role },
                { id: employeeResponse.employee }
            ]
        )

        console.log(`Employee's role updated.`)


    } catch (err) {
        console.log(err);
    }
}

getRoster = async () => {
    const conx = await databaseConx();

    const [rows] = await conx.query(
        `SELECT * FROM roles
        ORDER BY id ASC;`
    );

    console.table(rows);
}

addRole = async () => {
    try {

        console.log(chalk.underline.bgRed.bold(`Add New Role \n`));

        const conx = await databaseConx();

        const [department] = await conx.query(
            `SELECT * FROM department`
        )

        // added this so user ensures not to duplicate
        const [roles] = await conx.query(
            `SELECT * FROM roles`
        );
        console.table(roles);

        const deptChoice = department.map(roleDept => {
            return {
                name: roleDept.department_name,
                value: roleDept.id
            }
        });

        let response = await
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: `What is the name of the new role you'd like to add?`,
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the base salary of this role in $USD?',
                },
                {
                    type: 'list',
                    name: 'newRoleDept',
                    message: 'To which of the following departments does the new role belong?',
                    choices: deptChoice
                }
            ])

        let userChoice = await conx.query(
            `INSERT INTO roles SET ?`,
            {
                title: response.roleName,
                salary: response.salary,
                department_id: response.newRoleDept
            }
        );

        console.log(chalk.bgRedBright(`New role added to roster.`))

    } catch (err) {
        console.log(err);
    }
}

viewDepartments = async () => {
    const conx = await databaseConx();

    const [rows] = await conx.query(
        `SELECT * FROM department
        ORDER BY id ASC;`
    );

    console.table(rows);
}

addDepartment = async () => {
    try {
        console.log(chalk.underline.bgRed.bold(`Add New Department\n`));

        const conx = await databaseConx();

        const [ rows ] = await conx.query(
            `SELECT * FROM department`
        );
        console.table(rows);

        const response = await
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newDept',
                    message: `What is the name of the department you'd like to add?`
                }
            ])

        let result = await conx.query(
            `INSERT INTO department SET ?`,
            {
                department_name: response.newDept
            }
        );

        console.log(`New department ${response.newDept} added.`)
        
    } catch (err) {
        console.log(err);
    }
}

quit = () => {
    conx.end;
    process.exit();
}


module.exports = {
    rollCall,
    addEmployee,
    updateSingleRole,
    getRoster,
    addRole,
    viewDepartments,
    addDepartment,
    quit
}