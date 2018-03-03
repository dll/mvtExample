var jade = require("pug");
var express = require("express");
//var Db = require("./db");

var app = express();
app.set("view engine", "pug");
app.use(express.static("css"));
app.use(express.static("js"));

jade.renderFile("views/index.pug");
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/tiles/*", (req, res) =>{
    console.log(req.url);
    console.log("------------------");
    res.send();
});

//app.get("/wkt", (req, res) => {
    //var db = new Db();
    //db.getGeomsAsWkt().then( response => {
        //res.send(response);
    //});
//});

app.listen("8181", () => {});
