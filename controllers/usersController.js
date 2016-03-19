var ect = require("ect");
var users = require("../lib/users");
var parse_post = require("parse-post");
var renderer = ect({ root : __dirname + '/../views' });
var data = { title : 'Hello, World!' };
var qs = require('querystring');
var ValidatorEmail = require('validator');
var Validator = require('validator-json');
//var validator = new Validator(object, schema);
//var errors = validator.validate();

var schema = {
    name: { type: 'string', required: true },
    nick: { type: 'string', required: true },
    age: { type: 'number', required: false },
    email: { type: 'string', required: false },
    description: { type: 'string', required: false }
}

module.exports = {
    getAction: function (request, response, next) {
        response.ContentType = "application/json; charset=utf-8";
        response.write(JSON.stringify(users.getUsers(), 2));//Content-type application/json  не забыть добавить
        response.end()

    },
    postAction: function (request, response, next) {
        var body = '';

        function data_callback(data) {
            body += data;
        }


        request.on('data', data_callback);//Вытягиваем тело с поста в формате JSON
        request.on('end', function () {
            var data = JSON.parse(body);//Парсим JSON в JS
            console.log("data: " + data);
            console.log("body: " + body);
            var validator = new Validator(data, schema);//Проганяем полученый объект со схемой
            if (validator.validate().length == 0) {//Если пришел обьект, удовлетворяющий наличие двух полей
                if (data.email) {
                    if (ValidatorEmail.isEmail(data.email)) {//Если эмаил заполнен корректно - oтправляем данного пользователя на обработку в модуль users.js
                        users.addUser(data);
                        console.log("Объект отправлен в users.js c эмейлом");
                    } else {
                        console.log("Поле email указано не корректно");
                        response.statusCode = 400;
                        response.write(JSON.stringify({
                            "status": "Bad request"
                        }));
                        response.end();
                    }
                    console.log("Наш эмаил " + ValidatorEmail.isEmail(data.email));
                    response.end();
                } else {
                    users.addUser(data);
                    console.log("Объект отправлен в users.js без эмейла");
                }
            } else {
                console.log("Нет обязательных полей");
                response.statusCode = 400;
                response.write(JSON.stringify({
                    "status": "Bad request"
                }));
                response.end();
            }
        })
    }
};
