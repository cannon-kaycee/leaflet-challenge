function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        noWrap: true
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
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [streetMap, earthquakes]
      
    }).setView([0, 0], 1);
    
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "quakes" property from response.
    var quakes = response.features;

    // Initialize an array to hold quake markers.
    var quakeMarkers = [];

    var icon = L.icon({
        iconSize: quakesItem.properties.mag,
        iconColor: "green",
        shape: "circle"

    })
    
    
    // centerMarker.options.icon;
    //     icon.options.iconSize = [quakesItem.properties.mag];
    //     shape: "circle",
    //     centerMarker.setIcon(icon);
  
    // Loop through the quakes array.
    for (var index = 0; index < quakes.length; index++) {
      var quakesItem = quakes[index];
  
      // For each quake, create a marker, and bind a popup with the quake's name.
      var quakeMarker = L.marker([quakesItem.geometry.coordinates[1], quakesItem.geometry.coordinates[0]], {icon: icon})
        .bindPopup("<h3>" + "<h3><h3>Place: " + quakesItem.properties.place + "<h3><h3>Magnitude: " + quakesItem.properties.mag + "<h3><h3>Depth: " + quakesItem.geometry.coordinates[2] + "</h3>")};
  
      // Add the marker to the quakeMarkers array.
     quakeMarkers.push(quakeMarker);
  }
  
    // Create a layer group that's made from the quake markers array, and pass it to the createMap function.
    createMap(L.layerGroup(quakeMarkers));
   
  
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
