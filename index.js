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
        .prompt([
            {
                name: "allOptions",
                type: "list",
                message: "What would you like to do?",
                choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Employee Roles", "View All Employee Departments", "Add New Role", "Add New Department"],
            }
        ])
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

                case "View All Employee Roles":
                    viewAllRoles();
                    break;

                case "View All Employee Departments":
                    viewAllDepartments();
                    break;

                case "Add New Role":
                    addRole();
                    break;

                case "Add New Department":
                    addDepartment();
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
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
            }])
        .then(function (answer) {
            switch (answer.role) {
                case "Sales Lead":
                    answer.role = "1";
                    break;
                case "Salesperson":
                    answer.role = "2";
                    break;
                case "Lead Engineer":
                    answer.role = "3";
                    break;
                case "Software Engineer":
                    answer.role = "4";
                    break;
                case "Account Manager":
                    answer.role = "5";
                    break;
                case "Accountant":
                    answer.role = "6";
                    break;
                case "Legal Team Lead":
                    answer.role = "7";
                    break;
                case "Lawyer":
                    answer.role = "8";
                    break;
            }

            let queryE = "INSERT INTO employee SET ?";
            connection.query(queryE, { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role },
                function (err, res) {
                    if (err) throw err;
                    console.log("You added an employee!")
                })




        })

};

function viewAllEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id',
        function (err, res) {
            console.table(res);
            if (err) throw err;
        })

};

function viewAllRoles() {
    connection.query('SELECT role.id, role.title, role.salary FROM role',
        function (err, res) {
            console.table(res);
            if (err) throw err;
        })
};

function viewAllDepartments() {
    connection.query('SELECT department.id, department.department FROM department',
        function (err, res) {
            console.table(res);
            if (err) throw err;
        })
};

function viewByDepartment() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id',
        function (err, res) {
            console.table(res);
            if (err) throw err;
        })
};

function addRole() {
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What is the name of the role you'd like to add?"
            },

            {
                name: "roleDepartment",
                type: "",
                message: "What is the name of the role you'd like to add?"
            }
        ]).then(function (answer) {

        }
        )

};

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the name of the department you'd like to add?"
            },
        ]).then(function (answer) {
            connection.query('INSERT INTO department SET ?', { department: answer.department },
                function (err, res) {
                    if (err) throw err;
                    console.log("You added a department!")
                })

        }
        )
};