var jade = require("jade");
var express = require("express");

var app = express();
app.set("view engine", "jade")
html = jade.renderFile("views/index.jade")


app.get("/", function(req, res){
    res.render('index');
});

app.listen("8181", function(){});
