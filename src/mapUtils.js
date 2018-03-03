var mapUtils = function(){};

// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#X_and_Y
mapUtils.calculateBboxFromUrl = function(sUrl){
    "use strict";

    let tileToLongitude = function(x, z){
        return (x / Math.pow(2, z) * 360 - 180);
    };

    let tileToLatitude = function(y, z){
        var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
        return ( 180 / Math.PI * Math.atan(0.5 * ( Math.exp(n) - Math.exp( -n))));
    };

    let aUrl = sUrl.split("/");
    let z = parseInt(aUrl[2]);
    let x = parseInt(aUrl[3]);
    let y = parseInt(aUrl[4]);

    let xMin = tileToLongitude(x, z);
    let yMin = tileToLatitude(y, z);

    let xMax = tileToLongitude(x + 1, z);
    let yMax = tileToLatitude(y + 1, z);

    return [xMin, yMin, xMax, yMax];
};

module.exports = mapUtils;
