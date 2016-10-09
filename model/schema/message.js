/**
 * Created by Devil on 10/9/2016.
 */

var mongoose = require("mongoose");

var Schema=mongoose.Schema;

var MessageSchema=new Schema({

    message:String,

    date:Date

});

mongoose.model("Message",MessageSchema);
