require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Search",
    "esri/layers/FeatureLayer"

], function (Map, MapView, Search, FeatureLayer) {

    const map = new Map({
        basemap: "hybrid"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [25.279652, 54.687157],
        zoom: 17
    });


    const template = { //Add Popup template
        title: "Atminimo Lentos/Objekto informacija",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "OBJECTID",
                label: "ObjektoID",
            }, {
                fieldName: "ZMOGUS",
                label: "Zinomas_zmogus",
            }, {
                fieldName: "identif",
                label: "Identifikacija",
            },]
        }]
    }


    const layer = new FeatureLayer({ //Add Feature Layer
        url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Viln_lent_pam_2020_gdb/FeatureServer/0", // array of graphics objects
        outFields: ["*"],
        popupTemplate: template,
    });

    map.add(layer);


    const search = new Search({  //Add Search widget
        view: view,
        allPlaceholder: "Įveskite žymų žmogų",
        sources: [
            {
                layer: layer,
                searchFields: ["ZMOGUS"],
                displayField: "ZMOGUS"
            }]

    });

    view.ui.add(search, "top-right");

});

