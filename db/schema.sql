DROP DATABASE IF EXISTS employeecom_db;

CREATE DATABASE employeeCOM_DB;

USE employeeCOM_DB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (50),
    last_name VARCHAR (50),
    PRIMARY KEY (id)
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (50),
    salary DECIMAL (7, 2),
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30),
    PRIMARY KEY (id)
);

ALTER TABLE employee
ADD role_id INT;
ALTER TABLE employee 
ADD CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES role (id);

ALTER TABLE role
ADD department_id INT;
ALTER TABLE role 
ADD CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department (id);
