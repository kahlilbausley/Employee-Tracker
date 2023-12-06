drop table Employees;
CREATE TABLE Employees (
    id int primary key not null auto_increment,
    name varchar(20) not null,
    role int,
    manager int,
    foreign key(role) references Roles(id),
    foreign key(manager) references Employees(id)
  
);

drop table Roles;
CREATE TABLE Roles (
    id int primary key not null auto_increment,
    name varchar(20) not null,
    salary int,
    department int,
    foreign key(department)references Departments(id)

    
);
CREATE TABLE Departments (
    id int primary key not null auto_increment,
    name varchar(20) not null
    
    
);

INSERT INTO Roles (name,department)
values ('name',1);
INSERT INTO Employees (name)
VALUES ('name');
