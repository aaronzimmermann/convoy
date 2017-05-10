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
		  zoom: 8
		}
	);
}

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
	
	// Update fields
	document.getElementById("field_altitude").innerHTML = "Altitude: " + p_position.coords.altitude;
	document.getElementById("field_speed").innerHTML = "Altitude: " + p_position.coords.speed;
	document.getElementById("field_heading").innerHTML = "Altitude: " + p_position.coords.heading;
}

function onGeolocationError(p_error) {
	
}

function dispose() {
	navigator.geolocation.clearWatch(geolocationWatchId);
}


