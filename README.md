*** SETUP ***

Create empty project:  
$ phonegap create -n "convoy" -i "com.aaron.convoy" convoy  

Add platforms:  
$ cd convoy  
$ phonegap cordova platform add ios  
$ phonegap cordova platform add android  

Add plugins:
$ phonegap cordova plugin add cordova-plugin-geolocation