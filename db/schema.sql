CREATE DATABASE employeeCOM_DB;

USE employeeCOM_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR (30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (50),
    salary DECIMAL (9, 2),
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (50),
    last_name VARCHAR (50),
    role_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);

INSERT INTO department (department) VALUES ("Sales");
INSERT INTO department (department) VALUES ("Engineering");
INSERT INTO department (department) VALUES ("Finance");
INSERT INTO department (department) VALUES ("Legal");

-- INSERT INTO role (title, salary) VALUES ("Manager", 250,000);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 120000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 110000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Account Manager", 150000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 100000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 180000, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Mary", "Sherman", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("John", "Jones", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Harry", "Hernandez", 8);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Phil", "Collins", 6);


SELECT * FROM employeeCOM_db.employee;
SELECT * FROM employeeCOM_db.role;
SELECT * FROM employeeCOM_db.department;




