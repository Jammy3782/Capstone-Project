'use strict';

/**
 * @ngdoc function
 * @name farmersmarketApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the farmersmarketApp
 */
angular.module('farmersmarketApp')
  .controller('MainCtrl', function ($scope, NgMap) {
    //initialize map to Seattle (47.610902,-122.336422)
    $scope.latitude="47.610902";
    $scope.longitude="-122.336422";
    $scope.customMarkers = [
        {latitude: "47.50",longitude:"-122.40"},
        {latitude: "47.61",longitude:"-122.336"},
      ];
    // $.get( "zips.txt", function( data ) {
    //   var lines = data.split('\n');
    //   $scope.zipMap = {};
    //   lines.forEach(function (line) {
    //     var values = line.split(',');
    //     if (values[0] !== "ZIP") {
    //       $scope.zipMap[values[0]] = {latitude: values[1], longitude: values[2]};
    //     }
    //   });
    // });
    // $scope.update = function () {
    //   var coords = $scope.zipMap[$scope.zip];
    //   if (coords) {
    //     $scope.latitude = coords.latitude.trim();
    //     $scope.longitude = coords.longitude.trim();
    //   }
    //
    // };
  NgMap.getMap().then(function(map) {
  console.log(map.getCenter());
  console.log('markers', map.markers);
  console.log('shapes', map.shapes);
});
  });
