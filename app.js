/**
 * Created by Devil on 9/17/2016.
 */
var http = require("http");
var express = require("express");
var mongodb = require("mongodb");
var mongoose=require("mongoose");
var MongoClient = mongodb.MongoClient;
var app = express();

var dbLink = "mongodb://localhost:27017/hollywood";


var dbUser="Manokar";
var dbPassword="password";
// var dbLink="mongodb://"+dbUser+":"+dbPassword+"@ds029436.mlab.com:29436/demo_db";
app.get("/", function (req, res) {

    MongoClient.connect(dbLink, function (err, db) {

        if (err) {
            console.log("Unable to connect to the server", dbLink);
            res.send("Sorry cannot connect to db");
            return;
        }

        console.log("Connection established ", dbLink);

        var collection = db.collection("User");

        collection.find({}).toArray(function (err, result) {

            if (err) {
                res.send(err);
                db.close();
                return;
            } else if (!result.length) {
                res.send("No document found");
                db.close();
                return;
            }

            res.send(result);

            db.close();

        });

    });

});
app.listen(8000, function () {
    console.log("Server running on port " + 8000);
});
