let jade = require("pug");
let express = require("express");
let Db = require("./db");
let mapUtils = require("./mapUtils");
let Cache = require("./cache");

const app = express();
const db = new Db();
const cache = new Cache();

app.set("view engine", "pug");
app.use(express.static("css"));
app.use(express.static("src"));

jade.renderFile("views/index.pug");
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/tiles/*", (req, res) =>{
    let sMvt = cache.lookUp(req.url);
    if (!sMvt){
        let bbox = mapUtils.calculateBboxFromUrl(req.url);
        db.mvt(bbox).then((oResponse)=>{
            cache.set(req.url, oResponse[0]);
            res.send(oResponse[0]);
        });
    } else {
        res.send(sMvt);
    }
});

app.listen("8181", () => {});
