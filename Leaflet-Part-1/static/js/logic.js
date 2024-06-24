// This function returns a color based on the depth of the earthquake.
const getColor = function (depth) {
    // Define color codes for different depth ranges
    if (depth > 90) {
        return '#581845'; // Dark purple for depths greater than 90
    } else if (depth > 70) {
        return '#900C3F'; // Dark red for depths between 71 and 90
    } else if (depth > 50) {
        return '#C70039'; // Red for depths between 51 and 70
    } else if (depth > 30) {
        return '#FF5733'; // Orange for depths between 31 and 50
    } else if (depth > 10) {
        return '#FFC300'; // Yellow for depths between 11 and 30
    } else {
        return '#DAF7A6'; // Light green for depths 10 or less
    }
}
const geojsonMarkerOptions = function (feature) {
    return {
        radius: feature.properties.mag * 4,  // Adjusted for better visibility
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}


let map = L.map('map').setView([20, 0], 2); // Centered on a global view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

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
        }).addTo(map);

        // Adding a legend to the map
        const legend = L.control({position: 'bottomright'});

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
    });