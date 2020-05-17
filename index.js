// Buildling CLI with Inquirer 
require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


// Creating mysql connection

let connection = mysql.createConnection({
    host: "localhost",
    PORT: 8080,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employeeCOM_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which uses inquirer to prompt the user for what action they an take
function start() {
    inquirer
        .prompt({
            name: "allOptions",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
        })
        .then(function (answer) {
            switch (answer.allOptions) {
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View All Employees By Department":
                    viewByDepartment();
                    break;

                case "Add Employee":
                    console.log("You chose to add an employee")
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    udpateEmployeeRole();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
};
// building case functions
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: ["Manager", "Engineer", "Lawyer", "Accountant", "Designer", "Marketing Associate", "Custodian"]
            }])
        .then(function (answer) {
            switch (answer.role) {
                case "Manager":
                    return answer.role = "12";
                //finish up the cases to convert to role id's


            }
            let queryE = "INSERT INTO employee SET ? ?";
            connection.query(queryE, { first_name: answer.first_name, last_name: answer.last_name, role: answer.role },
                function (err, res) {
                    if (err) throw err;
                    console.log("You added an employee!")
                })


        })

};

function viewAllEmployees() {
    connection.query('SELECT * FROM employeeCOM_db.employee',
        function (err, res) {
            console.log(res)
            if (err) throw err;
            console.log("You added an employee!")
        })

}
