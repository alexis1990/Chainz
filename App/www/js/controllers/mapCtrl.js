app.controller('mapCtrl', function($scope, videosFactory) {

    var center, // Center of map
        map, // Map
        positions = {}, // position of the user
        videoMarkers = [], // Videos with Lat and Lng
        nextVideo = [], // Videos chainz
        idFirstVideo = ''; // Id of the first video (video of the marker)

    // First function launch
    var init = function() {
        // Get position of the user
        getPosition(function(c) {
            center = c;
            // Draw map
            drawMap(center, function(m) {
                map = m;
                // Get datas from server
                getUseData(center, map);
            });
        });
    }();

    // $scope.videos = [];

    // Get datas from server
    function getUseData(center, map) {
        // Call factory to get datas from server
        videosFactory.getVideos();
    };

    // Watch on changed data
    $scope.$watch(function() {
        return videosFactory.videos;
    }, function(newValue, oldValue) {
        if (newValue) {
            // Create Markers
            createMarkers(videosFactory.videos, center, map, function() {
                // Compare distance between 2 points
                compareDistances();
            });
        }
    }, true);

    function getPosition(callback) {
        navigator.geolocation.getCurrentPosition( // Create geolocation

            function(position) {
                // define center of geolocation
                center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // CREER LE CENTRAGE SUR LA POSITION
                positions.lat = position.coords.latitude;
                positions.lng = position.coords.longitude;
                // send position to 
                $scope.$emit('positions', positions);
                callback.call(this, center)
            },
            function() {
                console.log('error');
            }, {
                enableHighAccuracy: true
            }
        );


    };

    function drawMap(center, callback) {
        // Map settings
        var settings = {
            zoom: 17,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP // ROADMAP , SATELLITE OU HYBRID TYPE DE MAP
        };
        // Draw map
        map = new google.maps.Map(document.getElementById('map'), settings);

        // Marker on position
        var pos = new google.maps.Marker({
            position: center,
            map: map,
            title: "Your location"
        });
        callback.call(this, map);
    };


    // MULTIPLE MARKERS
    function createMarkers(data, center, map, callback) {
        for (i = 0; i < data.length; i++) {
            // init markers for each markers in data
            if (data[i].lat && data[i].lng) {
                // Define center to marker
                markerPos = new google.maps.LatLng(data[i].lat, data[i].lng);

                // create marker
                newMarkers = new google.maps.Marker({ // créet arry marker au dessus pour implémenter avec des [i]
                    position: markerPos,
                    map: map,
                    center: markerPos
                });

                // Create radius around marker
                var radiusOptions = {
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map,
                    center: markerPos,
                    radius: 20
                };
                // Add the circle for this city to the map.
                markerCircle = new google.maps.Circle(radiusOptions);

                // Set datas of marker on marker object
                newMarkers.set("id", data[i]._id);
                newMarkers.set("distance", calcDistance(center, markerPos));
                newMarkers.set("fileName", data[i].fileName);
                newMarkers.set("markerRadius", markerCircle);
                newMarkers.set("date", data[i].date);

                videoMarkers.push(newMarkers);

            } else {
                nextVideo.push(data[i]);
            }
        }
        callback.call(this);

    };

    // Calculates distance between two points in meters
    function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
    };


    // Compare distance between marker and position
    function compareDistances() {
        var videoChains = []; // Video created on an existing marker

        // For all video marker
        for (i = 0; i < videoMarkers.length; i++) {
            // If distance between marker and user position under 20 meters
            if (videoMarkers[i].distance < 20) {
                // For all chainz video
                for (j = 0; j < nextVideo.length; j++) {
                    // If same id
                    if (videoMarkers[i].id == nextVideo[j].idFirstVideo) {
                        videoChains.push(nextVideo[j]);
                    }
                }

                // If video chainz not empty
                if (videoChains.length < 1) {
                    // Emit id of the first video on controller.js
                    $scope.$emit('idFirstVideo', videoMarkers[i].id);
                    // Emit video to change src video in controller.js
                    $scope.$emit('setVideo', videoMarkers[i]);
                    // Emit the video marker radius to add event click to play video                    
                    $scope.$emit('showVideo', videoMarkers[i].markerRadius);

                } else {
                    // Emit id of the first video on controller.js
                    $scope.$emit('idFirstVideo', videoMarkers[i].id);
                    // Emit video to change src video in controller.js
                    $scope.$emit('setVideo', videoChains[0]);
                    // Emit the video marker radius to add event click to play video
                    $scope.$emit('showVideo', videoMarkers[i].markerRadius);

                }


            // If distance between marker and user position more than 40 meters
            } else if (videoMarkers[i] > 40) {

            }
        }

    }; // END of Compare distance


})