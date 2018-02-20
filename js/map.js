function Map(){
function Map(){
    this.map = new ol.Map({
        target: "map",
        layers: [ new ol.layer.Tile({ source: new ol.source.OSM() })],
        view: new ol.View({
            center:  [12, 52],
            zoom: 9,
            projection: "EPSG:4326"
        })
    });
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
};
