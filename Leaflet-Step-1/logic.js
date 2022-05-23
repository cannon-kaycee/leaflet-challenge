function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // noWrap: true
    });
  
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
      "Earthquake Map": streetMap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer.
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options.
    var map = L.map("map-id", {
      // center: [40.73, -74.0059],
      zoom: 40,
      layers: [streetMap, earthquakes]
      
    }).setView([0, 0], 1);
    
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);

    var geojsonMarkerOptions = {
        shape: "circle",
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    L.geojson(earthquakes, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);

}


function createMarkers(response) {
  
    // Pull the "quakes" property from response.
    var quakes = response.features;

    // Initialize an array to hold quake markers.
    var quakeMarkers = [];

    // Loop through the quakes array.
    for (var index = 0; index < quakes.length; index++) {
      var quakesItem = quakes[index];
      
      magnitude=[]
      magnitude=quakesItem.properties.mag
      var icon = L.icon({
        iconSize: quakesItem.properties.mag,
        iconColor: "green",
        shape: "circle"});
      

      // For each quake, create a marker, and bind a popup with the quake's name.
      var quakeMarker = L.circleMarker([quakesItem.geometry.coordinates[1], quakesItem.geometry.coordinates[0]])
        .bindPopup("<h3>" + "<h3><h3>Place: " + quakesItem.properties.place + "<h3><h3>Magnitude: " + quakesItem.properties.mag + "<h3><h3>Depth: " + quakesItem.geometry.coordinates[2] + "</h3>");
    


      // Add the marker to the quakeMarkers array.
     quakeMarkers.push(quakeMarker);
    }

    // Create a layer group that's made from the quake markers array, and pass it to the createMap function.
    createMap(L.layerGroup(quakeMarkers));
}

  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers,{getColor},{getSize})

function getColor(magnitude) {
  if (magnitude > 5) {
      return "#ea2c2c";
  }
  if (magnitude > 4) {
     return "#ea822c";
     }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
    }
   if (magnitude > 1) {
  return "#d4ee00";
  }
 return "#98ee00";
}
 
 function getSize(depth) {
   if (75 <= depth > 100) {
      return fillOpacity = 1;
   }
   if (50 <= depth > 75) {
     return fillOpacity = 0.8;
    }
   if (25 <= depth > 50) {
     return fillOpacity = 0.6;
   }
   if (10 <= depth > 25) {
     return fillOpacity = 0.4;
    }
    if (10 <= depth > 0) {
     return fillOpacity = 0.2;
    }
   return fillOpacity = 0.1;
 }
