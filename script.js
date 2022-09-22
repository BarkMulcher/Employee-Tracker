const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


async function main() {
    // get client
    const mysql = require('mysql2/promise');
    // create cx
    const connection = await mysql.createConnection({
        host: 'localhost', 
        user: 'root', 
        password: 'poop',
        database: 'employees_db'
    });
    // query db
    const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
}

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
    main();
    questions();
}

init();



// const mysql = require('mysql2');

// // create connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'test'
// });

// // simple query
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra metadata about results, if present
//     }
// );

// // with placeholder
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45],
//     function(err, results) {
//         console.log(results);
//     }
// );