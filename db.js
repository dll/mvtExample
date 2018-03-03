const { Client } = require("pg");

function Db(){
    this.client = new Client("postgres://postgres:postgres@localhost:5432/geodb");
    this.client.connect();
}

Db.prototype.getGeomsAsWkt = function(){
    let me = this;
    return new Promise((resolve, reject)=>{
        me.client.query("select st_asText(geom) as geom from geoms limit 200;", (error, results)=>{
            resolve(results.rows.map( row => {
                return row.geom;
            }));
        });
    });
};

Db.prototype.mvt = function(aBbox){
    let me = this;
    const sBottomLeft = aBbox[0] + ", " + aBbox[1];
    const sTopRight = aBbox[2] + ", " + aBbox[3];
    const sSrid = "4326";

    const sQuery = " with geoms as ( " +
        " select geom  " +
        " from geoms g " +
        " ), bottomLeft as ( " +
        " select st_setsrid(st_point( " + sBottomLeft + "), " + sSrid + ") as geom " +
        " ), topRight as ( " +
        " select st_setsrid(st_point( " + sTopRight + "), " + sSrid + ") as geom " +
        " ), bbox as ( " +
        " select st_makebox2d((select geom from bottomLeft), (select geom from topRight)) as bbox " +
        " ) " +
        "  " +
        " select st_asmvt(x) as mvt " +
        " from ( " +
        " select st_asmvtgeom(geom, (select bbox from bbox), 4096, 0, false) as mvtGeom " +
        " from geoms " +
        " )x; ";

    return new Promise((resolve, reject) => {
        me.client.query(sQuery, (error, results) => {
            resolve(results.rows.map( row => {
                return row.mvt;
            }));
        });
    });
};

module.exports = Db;
