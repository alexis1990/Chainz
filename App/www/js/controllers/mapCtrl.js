app.controller('mapCtrl', function($scope, videosFactory) {

    var center,
        map,
        positions = {},
        videoMarkers = [],
        nextVideo = [],
        idFirstVideo = '';


    var init = function() {
        getPosition(function(c) {
            center = c;
            drawMap(center, function(m) {
                map = m;
                getUseData(center, map);
            });
        });
    }();

    $scope.videos = [];

    function getUseData(center, map) {
        videosFactory.getVideos();
    };

    $scope.$watch(function() {
        return videosFactory.videos;
    }, function(newValue, oldValue) {
        if (newValue) {
            createMarkers(videosFactory.videos, center, map, function() {
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
        // Compare distance between marker and position
        callback.call(this);

    };

    // Calculates distance between two points in meters
    function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
    };


    // Compare distance between marker and position
    function compareDistances() {
        var videoChains = [];
        for (i = 0; i < videoMarkers.length; i++) {
            if (videoMarkers[i].distance < 20) {
                document.querySelector('.takeVideo').classList.add('hidden');
                for (j = 0; j < nextVideo.length; j++) {
                    if (videoMarkers[i].id == nextVideo[j].idFirstVideo) {
                        videoChains.push(nextVideo[j]);
                    }
                }

                if (videoChains.length < 1) {

                    $scope.$emit('idFirstVideo', videoMarkers[i].id);

                    $scope.$emit('setVideo', videoMarkers[i]);
                    $scope.$emit('showVideo', videoMarkers[i].markerRadius);

                } else {

                    $scope.$emit('idFirstVideo', videoMarkers[i].id);
                    videoChains.reverse();
                    $scope.$emit('setVideo', videoChains[0]);
                    $scope.$emit('showVideo', videoMarkers[i].markerRadius);

                }


            } else if (videoMarkers[i].distance < 40 && videoMarkers[i].distance > 20) {
                document.querySelector('.takeVideo').classList.add('hidden');
                document.querySelector('.continueVideo').classList.add('hidden');
            } else if (videoMarkers[i] > 40) {
                document.querySelector('.continueVideo').classList.add('hidden');
            }

        }

    };


})