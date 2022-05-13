var express = require('express');
const mysql = require("mysql2");
const bp = require('body-parser')
var app = express();
var fs = require("fs");

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "students",
    password: "060601",
    //port: 3306,
});

app.set("view engine", "hbs");

//Вывод всех данных из json
app.get('/students', function (req, res) {
   pool.query("SELECT * FROM students;", function(err, data) {
    if(err) return console.log(err);
        res.end(JSON.stringify(data));
    });
})


//Вывод данных из json по одному объекту
app.get('/students/:id', function (req, res) {
    const id = req.params.id;
    pool.query("SELECT * FROM students WHERE id=?", [id], function(err, data) {
        if(err) return console.log(err);
            res.end( JSON.stringify(data));
    });
})


//Добавление объекта
app.post('/students', function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const group_name = req.body.group_name;
    pool.query("INSERT INTO students (first_name, last_name, group_name, created_at, updated_at) VALUES (?,?,?, current_timestamp, current_timestamp)", [first_name, last_name, group_name], function(err, data) {
      if(err) return console.log(err);
      res.end("Данные записаны");
    });
})


//Изменение объекта
app.put('/students/:id', function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const group_name = req.body.group_name;
    const id = req.params.id;
    pool.query("UPDATE students SET first_name=?, last_name=?, group_name =? WHERE id=?", [first_name, last_name, group_name, id], function(err, data) {
      if(err) return console.log(err);
      pool.query("SELECT * FROM students WHERE id=?", [id], function(err, data) {
        if(err) return console.log(err);
            res.end( JSON.stringify(data));
        });
    });
})


//Удаление объекта
app.delete('/students/:id', function (req, res) {
    const id = req.params.id;
    pool.query("DELETE FROM students WHERE id=?", [id], function(err, data) {
      if(err) return console.log(err);
      res.end("Данные удалены");
    });
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is running")
})