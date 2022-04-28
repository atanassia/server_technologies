var express = require('express');
var app = express();
var fs = require("fs");


//Вывод всех данных из json
app.get('/students', function (req, res) {
   fs.readFile( __dirname + "/" + "students.json", 'utf8', function (err, data) {
      res.end( data );
   });
})


//Вывод данных из json по одному объекту
app.get('/students/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "students.json", 'utf8', function (err, data) {
       var data = JSON.parse( data );
       var student = data[req.params.id] 
       res.end( JSON.stringify(student));
    });
})


var studentadd = {

    "6":{ 
        "id":6,
        "fistName": "Ivan2", 
        "lastName": "Ivanov2", 
        "group": "VIS21",
        "createdAt": "2020-03-02T12:41:09.533Z",
        "updatedAt": "2020-03-02T12:45:02.121Z"
    }
}
 

//Добавление объекта
app.post('/students', function (req, res) {
    fs.readFile( __dirname + "/" + "students.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["6"] = studentadd["6"];
       res.end( JSON.stringify(data));
    });
})


//Изменение объекта
app.put('/students/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "students.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data[req.params.id]["firstName"] = "Vasya";
       res.end( JSON.stringify(data));
    });
})


//Удаление объекта
app.delete('/students/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "students.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data[req.params.id];       
       res.end( JSON.stringify(data));
    });
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is running")
})