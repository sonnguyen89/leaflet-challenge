let map = L.map('map').setView([20, 0], 2); // Centered on a global view

// Base maps
let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

const getColor = function (depth) {
    if (depth > 90) {
        return '#581845';
    } else if (depth > 70) {
        return '#900C3F';
    } else if (depth > 50) {
        return '#C70039';
    } else if (depth > 30) {
        return '#FF5733';
    } else if (depth > 10) {
        return '#FFC300';
    } else {
        return '#DAF7A6';
    }
}

const geojsonMarkerOptions = function (feature) {
    return {
        radius: feature.properties.mag * 4,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
};

streetMap.addTo(map); // Add streetMap as the default base map

// Overlays
let earthquakeLayer = new L.LayerGroup();
let tectonicPlatesLayer = new L.LayerGroup();

fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJson(data, {
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, geojsonMarkerOptions(feature));
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
            }
        }).addTo(earthquakeLayer);
    });

fetch('static/tectonicplates/GeoJSON/PB2002_boundaries.json')
    .then(response => response.json())
    .then(data => {
        L.geoJson(data, {
            style: {
                color: "yellow",
                weight: 2
            }
        }).addTo(tectonicPlatesLayer);
    });

// Add both layers to the map initially
earthquakeLayer.addTo(map);
tectonicPlatesLayer.addTo(map);

// Layer controls
let baseMaps = {
    "Street Map": streetMap,
    "Topographic Map": topoMap
};

let overlayMaps = {
    "Tectonic Plates": tectonicPlatesLayer,
    "Earthquakes": earthquakeLayer
};

L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

// Adding a legend to the map
let legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    const depths = [-10, 10, 30, 50, 70, 90];
    const labels = [];

    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
