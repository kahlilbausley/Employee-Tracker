//require("mysql2/promise");// get the client
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const mysql2 = require("mysql2")


function createEmployee(role, department, employeename, connection) {

    connection.execute(
        'INSERT INTO Employees (name,role) VALUES (?,?);',
        [employeename, role],
        function (err, results, fields) {
            console.table(results); // results contains rows returned by server
        }
    );
}


function department(departmentName, connection) {
    connection.execute(
        'INSERT INTO Departments (name)VALUES(?);'
        [departmentName],
        function (err, results, fields) {
            console.table(results);// results contains rows returned by server

        }
    );
};
function createRole(roleName, connection) {
    connection.execute(
        'INSERT INTO Roles (name)VALUES(?);'
        [roleName],
        function (err, results, fields) {
            console.log(results);// results contains rows returned by server

        }
    );

}
function updateEmployeeRole(employeeId, roleId, connection) {
    connection.execute(
        'UPDATE EMPLOYEES Set Role=? where Id=?',
        [roleId, employeeId],
        function (err, results, fields) {
            console.log(results);// results contains rows returned by server
        }
    );
}
async function getDepartment(departmentId, connection) {

    const [rows] = await connection.execute(
        `
    SELECT
        Id,Name
    FROM
        departments
    WHERE
        Id = ?
    `,
        [departmentId]

    );
    if (rows.length == 0) {
        return null;
    }
    else {
        return rows.map((row) => {
            return row;
        });


    }


}

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees',
    password: 'Snoop2020!!'
})

// create the connection to database
// mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'employees',
//     password: 'Snoop2020!!'
//     })
// .then(connection=>{
//     var departmentPromise= getDepartment(1,connection);
//     departmentPromise.then(function(department){
//         console.log(department);



//     });
//     // updateEmployeeRole(1,1,connection);
//     department()

// });



menu()
function menu() {
    inquirer.prompt({
        type: "list",
        message: "what would you like to do",
        name: "menu",
        choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
    })
        .then(answer => {
            if (answer.menu == "View Departments") {
                viewDepartments()
            }
            if (answer.menu == "View Roles") {
                viewRoles()
            }
            if (answer.menu == "View Employees") {
                viewEmployees()
            }
            if (answer.menu == "Add Department") {
                addDepartment()
            }
            if (answer.menu == "Add Role") {
                addRole()
            }
            if (answer.menu == "Add Employee") {
                addEmployee()
            }
            if (answer.menu == "Update Employee Role") {
                updateEmployeeRole()
            }

        })
}

function viewDepartments() {
    db.query(`select * from Departments`, (err, res) => {
        if (err) throw err;
        console.table(res)
        menu()
    })
}

function viewRoles() {
    db.query(`select * from Roles`, (err, res) => {
        if (err) throw err;
        console.table(res)
        menu()
    })
}

function viewEmployees() {
    db.query(`select * from Employees`, (err, res) => {
        if (err) throw err;
        console.table(res)
        menu()
    })
}

function addDepartment() {
    inquirer.prompt({
        message: "what would you like to add",
        name: "name",
    }).then(answer => {
        db.query(`insert into Departments (name) values("${answer.name}")`, (err, res) => {
            if (err) throw err;
            console.table(res)
            menu()
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "what would you like to add",
            name: "title",
        },
        {
            message: "what is the salary",
            name: "salary",
        },
        {
            message: "what is the department id",
            name: "departmentId",
        },
    ]).then(answer => {
        db.query(`insert into Roles (name, salary, department) values("${answer.title}", ${answer.salary}, ${answer.departmentId})`, (err, res) => {
            if (err) throw err;
            console.table(res)
            menu()
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            message: "what is the name",
            name: "name",
        },
        {
            message: "what is the role id",
            name: "role_id",
        },
        {
            message: "what is the manager id",
            name: "manager_id",
            default: null
        },
    ]).then(answer => {
        db.query(`insert into Employees (name, role, manager) values("${answer.name}", "${answer.role_id}", ${answer.manager_id})`, (err, res) => {
            if (err) throw err;
            console.table(res)
            menu()
        })
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "what is the employee's id that you want to update",
            name: "emp_id",
        },
        {
            message: "what is the new role id",
            name: "role_id",
        }
    ]).then(answer => {
        db.query(`update Employees set role = ${answer.role_id} where id = ${answer.emp_id}`, (err, res) => {
            if (err) throw err;
            console.table(res)
            menu()
        })
    })
}