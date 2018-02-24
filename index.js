var jade = require("jade");
var express = require("express");
var Db = require("./db");

var app = express();
app.set("view engine", "jade")
app.use(express.static("css"))
app.use(express.static("js"))

jade.renderFile("views/index.jade")

app.get("/", (req, res)=>{
				var db = new Db();
				db.getVectorTiles().then(response=>{
								res.render('index', {
												data: response
								});
				});
});

app.listen("8181", ()=>{});
