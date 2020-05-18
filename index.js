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
                choices: ["View All Employees", "View All Employees By Department", "Add Employee", "Update Employee Role", "View All Employee Roles", "View All Employee Departments", "Add New Role", "Add New Department"],
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

function addEmployee() {
    connection.query("SELECT role.title FROM role",
        function (err, res) {
            if (err) throw err;
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
                        name: "roleChoice",
                        type: "rawlist",
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].title);
                            }
                            return choiceArray;
                        },
                        message: "What is the employee's role?"
                    }


                ]).then(function (answer) {
                    connection.query("SELECT role.id FROM role WHERE ? ", { title: answer.roleChoice }, function (err, res) {
                        let roleID = res[0].id
                        connection.query("INSERT INTO employee SET ? ",
                            {
                                first_name: answer.first_name,
                                last_name: answer.last_name,
                                role_id: roleID
                            },
                            function (err, res) {
                                if (err) throw err;
                                start();
                            })
                    }
                    )
                }
                )
        }
    )

}


function viewAllEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id',
        function (err, res) {
            console.table(res);
            if (err) throw err;
            console.log("-----------------------------------------------------------------")
        })
    start();
    console.log("------------------------")

};

function viewAllRoles() {
    connection.query('SELECT role.id, role.title, role.salary FROM role',
        function (err, res) {
            console.table(res);
            if (err) throw err;
        })
    start();
    console.log("---------------")

};

function viewAllDepartments() {
    connection.query('SELECT department.id, department.department FROM department',
        function (err, res) {
            console.table(res);
            if (err) throw err;
        })
    start();
    console.log("---------------")
};

function viewByDepartment() {
    connection.query("SELECT department.department FROM department",
        function (err, res) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "department",
                        type: "rawlist",
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].department);
                            }
                            return choiceArray;
                        },
                        message: "Choose the department ID you'd like to view:"
                    }
                ]).then(function (answer) {
                    // connection.query("SELECT department.id FROM department WHERE ? ", { department: answer.department }, function (err, res) {
                    //     let departmentID = res[0].id
                    //     departmentID = department.id;
                    connection.query("SELECT ? FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ",
                        {
                            id: employee.id,
                            first_name: employee.first_name,
                            last_name: employee.last_name,
                            role: role.title,
                            department: answer.department,
                            salary: role.salary
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.table(res);
                            // start();
                        })
                    // }
                    // )
                }
                )
        })
}
function udpateEmployeeRole() {
    connection.query("SELECT role.title FROM role",
        function (err, res) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "employeeID",
                        type: "input",
                        message: "What is the ID of the employee whose role will be changed?"
                    },
                    {
                        name: "roleChoice",
                        type: "rawlist",
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].title);
                            }
                            return choiceArray;
                        },
                        message: "Choose the employee's new role:"
                    }


                ]).then(function (answer) {
                    connection.query("SELECT role.id FROM role WHERE ? ", { title: answer.roleChoice }, function (err, res) {
                        let newRoleID = res[0].id
                        connection.query("UPDATE employee SET ? WHERE ? ",
                            [
                                {
                                    role_id: newRoleID
                                },
                                {
                                    id: answer.employeeID
                                },
                            ],
                            function (err, res) {
                                if (err) throw err;
                                console.log("Role successfully updated!");
                                start();
                            })
                    }
                    )
                }
                )
        })
}

function addRole() {
    connection.query("SELECT department.department FROM department",
        function (err, res) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "role",
                        type: "input",
                        message: "What is the name of the role you'd like to add?"
                    },

                    {
                        name: "salary",
                        type: "input",
                        message: "What is the salary for this role? (Please use integers only - no commas!)"
                    },

                    {
                        name: "roleDepartment",
                        type: "rawlist",
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].department);
                            }
                            return choiceArray;
                        },
                        message: "To which department does this role belong?"
                    }


                ]).then(function (answer) {
                    connection.query("SELECT department.id FROM department WHERE ? ", { department: answer.roleDepartment }, function (err, res) {
                        let departmentID = res[0].id
                        connection.query("INSERT INTO role SET ? ",
                            {
                                title: answer.role,
                                salary: answer.salary,
                                department_id: departmentID
                            },
                            function (err, res) {
                                if (err) throw err;
                                console.log("Role successfully added!")
                                start();
                            })
                    }
                    )
                }
                )
        })

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
                    start();
                })

        }
        )

};


