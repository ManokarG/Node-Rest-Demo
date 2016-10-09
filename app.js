/**
 * Created by Devil on 9/17/2016.
 */
var http = require("http");
var express = require("express");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var message=require("./model/schema/message");
var bodyParser=require("body-parser");
var app = express();
var router=express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var dbLink = "mongodb://localhost:27017/hollywood";

var dbLink = "mongodb://Manokar:password@jello.modulusmongo.net:27017/uvyza8bI";

var db=mongoose.connect(dbLink);

var Message = mongoose.model('Message');

var dbUser = "Manokar";
var dbPassword = "password";
// var dbLink="mongodb://"+dbUser+":"+dbPassword+"@ds029436.mlab.com:29436/demo_db";

app.get("/message",getMessages);

app.post("/message",postMessage);

// This function is responsible for returning all entries for the Message model
function getMessages(req, res, next) {
    // Resitify currently has a bug which doesn't allow you to set default headers
    // This headers comply with CORS and allow us to server our response to any origin
    // .find() without any arguments, will return all results
    // the `-1` in .sort() means descending order
    Message.find().sort('date').exec(function (arr,data) {
        res.send(data);
        return;
    });
}

function postMessage(req, res, next) {
    // Create a new message model, fill it up and save it to Mongodb
    var message = new Message();
    message.message = req.body.message;
    message.date = new Date();
    message.save(function () {
        res.send(req.body);
        return;
    });
}

var port=process.env.PORT ||8000;

app.listen(port, function () {
    console.log("Server running on port " + 8000);
});
