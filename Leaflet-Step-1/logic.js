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

      var icon = L.icon({
        iconSize: quakesItem.properties.mag,
        iconColor: "green",
        shape: "circle"});
  
      // For each quake, create a marker, and bind a popup with the quake's name.
      var quakeMarker = L.circleMarker([quakesItem.geometry.coordinates[1], quakesItem.geometry.coordinates[0]], {icon: icon})
        .bindPopup("<h3>" + "<h3><h3>Place: " + quakesItem.properties.place + "<h3><h3>Magnitude: " + quakesItem.properties.mag + "<h3><h3>Depth: " + quakesItem.geometry.coordinates[2] + "</h3>");
    


      // Add the marker to the quakeMarkers array.
     quakeMarkers.push(quakeMarker);
    }

    // Create a layer group that's made from the quake markers array, and pass it to the createMap function.
    createMap(L.layerGroup(quakeMarkers, getColor));
}

  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {}).addTo(earthquakes);

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




//   I recommend the following strategy:
// 1. Create a function that uses if-statements/switch statement that returns a string with the color code/name based on a depth integer value.
// 2. Create a function that takes a magnitude argument (a number) and returns a 1 if the magnitude argument is 0 (this is so earthquakes with low magnitudes still appear), or returns the magnitude multiplied by an integer otherwise (maybe magnitude * 3)
// 3. Create a function that simply returns an object/dictionary with properties such as opacity, fillColor (the value of this would be the return value of calling the function that returns a color name/code), a radius property (using the return value of calling the function that returns the magnitude), and any other property you want.
// 4. To add it to the map, you can call L.geoJson as follows:
// L.geoJson(data, {
//     // We turn each feature into a circleMarker on the map.
//     pointToLayer: function (feature, latlng) {
//       return L.circleMarker(latlng);
//     },
//     // We set the style for each circleMarker using our styleInfo function.
//     style: YOUR_FUNCTION_THAT_RETURNS_THE_DICTIONARY_GOES_HERE
//   }).addTo(map);


//     function setIcon(mag){
//         iconSize: quakesItem.properties.mag*3
//     }
//   L.geoJSON(earthquakes, {
//       pointToLayer:function(feature,latlng) {
//           return L.circleMarker(latlng)
//       },
//       style: setIcon}).addTo(map);

//   function setMag(mag) {
//     if (quakesItem.properties.mag < 1)
//     if (quakesItem.properties.mag >= 1) and (quakesItem.properties.mag < 2)
//     if (quakesItem.properties.mag >= 2) and (quakesItem.properties.mag < 3)
//     if (quakesItem.properties.mag >= 3) and (quakesItem.properties.mag < 4)
//     if (quakesItem.properties.mag >= 4) and (quakesItem.properties.mag < 5)
//     if (quakesItem.properties.mag >= 5) and (quakesItem.properties.mag < 6)
//     if (quakesItem.properties.mag >= 6) and (quakesItem.properties.mag < 7)
// }

    // centerMarker.options.icon;
    //     icon.options.iconSize = [quakesItem.properties.mag];
    //     shape: "circle",
    //     centerMarker.setIcon(icon);