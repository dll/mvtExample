function Map(){
    this.Formats = {
        wkt: () => { return "wkt"; }
    };

    this.map = new ol.Map({
        target: "map",
        renderer: "canvas",
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.VectorTile({
                source: new ol.source.VectorTile({
                    format: new ol.format.MVT(),
                    url: "http://localhost:8181/tiles/{z}/{x}/{y}"
                })
            })
        ],
        view: new ol.View({
            center: [0, 0],
            zoom: 2,
            projection: "EPSG:3857"
        })
    });
}

Map.prototype.requestWktGeometries = function(){
    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/wkt", true);
        xhr.onload = function(oEvent){
            if (xhr.readyState !== 4){
                return;
            }

            if (xhr.status === 200){
                resolve(JSON.parse(xhr.response));
            }
        };
        xhr.send();
    });
};

Map.prototype.drawWktGeometries = function(aGeometries){
    if (!aGeometries || aGeometries.length === 0){
        return;
    }

    let oReader = new ol.format.WKT();
    let oVectorSource = new ol.source.Vector();
    aGeometries.forEach( oGeometry => {
        let oFeature = oReader.readFeature(oGeometry);
        if (!oFeature) { return; }

        oVectorSource.addFeature(oFeature);
    });

    let oVectorLayer = new ol.layer.Vector();
    oVectorLayer.setSource(oVectorSource);

    this.map.addLayer(oVectorLayer);
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

