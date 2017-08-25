'use strict';

/**
 * @ngdoc function
 * @name farmersmarketApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the farmersmarketApp
 */
angular.module('farmersmarketApp')
  .controller('MainCtrl', function($scope, NgMap) {
    //initialize map to Seattle (47.610902,-122.336422)
    $scope.latitude = "47.610902";
    $scope.longitude = "-122.336422";
    $scope.customMarkers = [
      //      {latitude: "47.50",longitude:"-122.40"},
      //      {latitude: "47.61",longitude:"-122.336"},
    ];
    $.get("zips.txt", function(data) {
      var lines = data.split('\n');
      $scope.zipMap = {};
      lines.forEach(function(line) {
        var values = line.split(',');
        if (values[0] !== "ZIP") {
          $scope.zipMap[values[0]] = {
            latitude: values[1],
            longitude: values[2]
          };
        }
      });
    });
    $scope.update = function() {
      var coords = $scope.zipMap[$scope.zip];
      if (coords) {
        $scope.latitude = coords.latitude.trim();
        $scope.longitude = coords.longitude.trim();
        var center = new google.maps.LatLng(Number($scope.latitude), Number($scope.longitude));

        // map = new google.maps.Map(document.getElementById('map'), {
        //     center: pyrmont,
        //     zoom: 15
        //   });

        var request = {
          location: center,
          radius: '20000',
          keyword: "farmers market",
          type: ["food", "point_of_interest", "establishment"]
        };

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              //      var place = results[i];
              //      var lat = place.geometry.location.lat();
              //     var lng = place.geometry.location.lng();
              //      $scope.customMarkers.push({latitude:lat, longitude:lng});
              createMarker(results[i]);
            }
          }
        }

        function createMarker(place) {
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();
          var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h4 id="firstHeading" class="firstHeading">' + place.name + '</h4>' +
            '<div id="bodyContent">' +
            '<p><b>Location:</b> ' + place.vicinity + '</p>' +
            '<p><b>Rating:</b> ' + place.rating + '</p>' +
            '</div>' +
            '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            icon: "images/mapmarker2.png",
            map: $scope.map
          });
          marker.addListener('click', function() {
            infowindow.open($scope.map, marker);
          });
        }
        var service = new google.maps.places.PlacesService($scope.map);
        service.nearbySearch(request, callback);
      }

    };
    NgMap.getMap().then(function(map) {
      $scope.map = map;
      // console.log(map.getCenter());
      // console.log('markers', map.markers);
      // console.log('shapes', map.shapes);
    });
  });
