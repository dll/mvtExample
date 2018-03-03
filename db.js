const { Client } = require("pg");

function Db(){
    this.client = new Client("postgres://postgres:postgres@localhost:5432/geodb");
    this.client.connect();
}

Db.prototype.getVectorTiles = function(){
    var me = this;
    return new Promise((resolve, reject)=>{
        me.client.query("select geom from geoms limit 500;", (error, results)=>{
            resolve(results.rows);
        });
    });
};

Db.prototype.getGeomsAsWkt = function(){
    var me = this;
    return new Promise((resolve, reject)=>{
        me.client.query("select st_asText(geom) as geom from geoms limit 200;", (error, results)=>{
            var text = "MULTIPOLYGON(((4068 301,4096 155,3924 154,3325 130,2769 101,2061 69,1408 35,775 0,729 0,679 19,641 47,604 149,353 811,159 1300,9 1710,0 1755,68 1803,536 2143,868 2380,1515 2830,1891 3084,2897 3826,3117 3966,3281 4060,3369 4096,3407 3943,3704 2201,4068 301)))";
			resolve([text]);
            //resolve(results.rows.map( row => {
                //return row.geom;
            //}));
        });
    });
};

module.exports = Db;
