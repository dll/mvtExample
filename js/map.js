function Map(){
    this.Formats = {
        wkt: () => { return "wkt"; },
        vectorTile: () => { return "vectorTile"; }
    };
    this.map = new ol.Map({
        target: "map",
        layers: [ new ol.layer.Tile({ source: new ol.source.OSM() })],
        view: new ol.View({
            center:  [12, 52],
            zoom: 9,
            projection: "EPSG:4326"
        })
    });
}

Map.prototype.requestGeometries = function(){

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/wkt", true);
    xhr.onload = function(oEvent){
        if (xhr.readyState !== 4){
            return;
        }

        if (xhr.status === 200){
            let response = JSON.parse(xhr.response);
            console.log(response);
        }
    };
    xhr.send();
};

Map.prototype.addGeometries = function(aGeometries, sFormat){
    let reader;
    switch (sFormat){
        case this.Formats.wkt():
            reader = new ol.format.WKT();
            break;
        default:
            return;
    }

    let aFeatures = reader.readFeatures(aGeometries);
    console.log(aFeatures);
};

