var express = require('express');
var app = express();
var fs = require("fs");


students = {
    "1":{
        "id":1,
        "firstName": "Ivan",
        "lastName": "Ivanov",
        "group": "VIS21",
        "createdAt": "2020-03-02T12:41:09.533Z",
        "updatedAt": "2020-03-02T12:45:02.121Z"
    },

    "2":{
        "id":2,
        "firstName": "Homer",
        "lastName": "Sivol",
        "group": "VIS11",
        "createdAt": "2020-03-02T12:40:01.533Z",
        "updatedAt": "2020-03-02T12:45:02.121Z"
    },

    "3":{
        "id":3,
        "firstName": "Liza",
        "lastName": "Ivanova",
        "group": "VIS41",
        "createdAt": "2020-02-02T12:41:09.533Z",
        "updatedAt": "2020-03-02T12:45:02.121Z"
    },

    "4":{
        "id":4,
        "firstName": "Anya",
        "lastName": "Sereneva",
        "group": "VIS11",
        "createdAt": "2020-03-01T12:41:09.533Z",
        "updatedAt": "2020-03-02T12:15:02.121Z"
    },
    
    "5":{
        "id":5,
        "firstName": "Nikolay",
        "lastName": "Tarantiev",
        "group": "VIS12",
        "createdAt": "2019-03-02T12:41:09.533Z",
        "updatedAt": "2020-03-02T12:45:02.121Z"
    }
}


//Вывод всех данных из json
app.get('/students', function (req, res) {
    res.end( JSON.stringify(students) );
})


//Вывод данных из json по одному объекту
app.get('/students/:id', function (req, res) {
    var student = students[req.params.id] 
    res.end( JSON.stringify(student));
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
 

// //Добавление объекта
app.post('/students', function (req, res) {
    students["6"] = studentadd["6"];
    res.end( JSON.stringify(students));
})


//Изменение объекта
app.put('/students/:id', function (req, res) {
    students[req.params.id]["firstName"] = "Vasya";
    res.end( JSON.stringify(students));
})


//Удаление объекта
app.delete('/students/:id', function (req, res) {
    delete students[req.params.id];       
    res.end( JSON.stringify(students));
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is running")
})