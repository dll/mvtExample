const { Client } = require("pg");

function Db(){
    this.client = new Client("postgres://postgres:postgres@localhost:5432/geodb");
    this.client.connect();
}

Db.prototype.getVectorTiles = function(){
    var me = this;
    return new Promise((resolve, reject)=>{
        me.client.query("select geom from geoms limit 5000;", (error, results)=>{
            resolve(results.rows);
        });
    });
};

Db.prototype.getGeomsAsWkt = function(){
    var me = this;
    return new Promise((resolve, reject)=>{
        me.client.query("select st_asText(geom) as geom from geoms limit 200;", (error, results)=>{
            resolve(results.rows.map( row => {
                return row.geom;
            }));
        });
    });
};

module.exports = Db;
