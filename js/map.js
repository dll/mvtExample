function Map(){
    this.Formats = {
        wkt: () => { return "wkt"; },
        vectorTile: () => { return "vectorTile"; }
    };
    let oMouseControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:3857'
    });

    this.map = new ol.Map({
        target: "map",
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.VectorTile({
                source: new ol.source.VectorTile({
                    format: new ol.format.MVT(),
                    url: "http://localhost:8181/tiles/{z}/{x}/{y}",
                    projection: "EPSG:3857"
                })
            })
        ],
        view: new ol.View({
            //center:  [12, 49],
            center: [1335833.89, 6800125.45],
            zoom: 8,
            //projection: "EPSG:4326"
            projection: "EPSG:3857"
        })
    });

    this.map.addControl(oMouseControl);
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

    var oReader = new ol.format.WKT();
    var oVectorSource = new ol.source.Vector();
    aGeometries.forEach( oGeometry => {
        let oFeature = oReader.readFeature(oGeometry);
        if (!oFeature) { return; }

        oVectorSource.addFeature(oFeature);
    });

    var oVectorLayer = new ol.layer.Vector();
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

