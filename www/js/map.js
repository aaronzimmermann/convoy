// Variables
var map = null;
var mapMarker = null;
var geolocationWatchId;

// Called when the page has loaded
function onLoad() {
	
	// If on a device add a deviceready event, otherwise call it immediately
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
}

// Called when the device is ready
function onDeviceReady() {
	
	// Receive geolocation updates
    geolocationWatchId = navigator.geolocation.watchPosition(onGeolocationUpdate, onGeolocationError, 
    	{
	    	maximumAge: 3000,
	    	timeout: 5000, 
	    	enableHighAccuracy: true 
    	}
    );
}

// Initialises Google Maps
function initMap() {
	map = new google.maps.Map(document.getElementById('map'),
		{
		  center: {lat: -34.397, lng: 150.644},
		  scrollwheel: false,
		  zoom: 8,
		  zoomControl: false,
		  scaleControl: false,
		  streetViewControl: false
		}
	);
}

// Called when a geolocation update has been received.
function onGeolocationUpdate(p_position) {
	
	// Show location on Google Maps
	if(map != null) {
		
		// Create the position
		var latLon = new google.maps.LatLng(p_position.coords.latitude, p_position.coords.longitude);
		
		// Create or set the marker
		if(mapMarker == null) {
			mapMarker = new google.maps.Marker({
		        position: latLon
		    });
		} else {
			mapMarker.setPosition(latLon);
		}
		
		// Put the marker on the map
	    mapMarker.setMap(map);
	    map.setZoom(15);
		map.setCenter(mapMarker.getPosition());
	}
	
	// Remove geolocation loading message
	document.getElementById("geolocationLoading").style.visibility = "hidden"; 
	document.getElementById("geolocationLoaded").style.visibility = "visible"; 
	
	// Update fields
	updateGeolocationFields(p_position.coords.speed, p_position.coords.heading, p_position.coords.altitude);
}

// Called when there is a gelocation error
function onGeolocationError(p_error) {
}

// Updates the geolocation fields on the Map view
function updateGeolocationFields(p_speed, p_heading, p_altitude) {
	document.getElementById("field_altitude").innerHTML = parseAltitude(p_altitude) + "m";
	document.getElementById("field_speed").innerHTML = parseSpeed(p_speed) + "Km/h";
	document.getElementById("field_heading").innerHTML = parseHeading(p_heading);
}

// Parse the speed value from Geolocation
function parseSpeed(p_speed) {
	
	// Check for unknown value
	if(isNaN(p_speed)) {
		return "- ";
	}
	
	// Convert from metres per second to kilometres per hour
	return Math.round(p_speed / 1000.0 * 60 * 60);	
}

// Parse the altitude value from Geolocation
function parseAltitude(p_altitude) {
	return Math.round(p_altitude);
}

// Parse the altitude value from Geolocation
function parseHeading(p_heading) {
	
	// Check for unknown value
	if(isNaN(p_heading)) {
		return "";
	}
	
	// Convert to compass direction
	if(p_heading < 22.5 | p_heading > 337.5) {
		return "N";
	}
	if(p_heading < 67.5) {
		return "NE";
	}
	if(p_heading < 112.5) {
		return "E";
	}
	if(p_heading < 157.5) {
		return "SE";
	}
	if(p_heading < 202.5) {
		return "S";
	}
	if(p_heading < 247.5) {
		return "SW";
	}
	if(p_heading < 292.5) {
		return "W";
	}
	if(p_heading < 337.5) {
		return "NW";
	}
}

// Disposes the App.
function dispose() {
	navigator.geolocation.clearWatch(geolocationWatchId);
}


