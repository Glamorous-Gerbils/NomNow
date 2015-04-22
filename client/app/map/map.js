var nomNow = angular.module('nomNow.map', ['ui.bootstrap'])

nomNow.directive('googleplace', function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
 
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    scope.details = scope.gPlace.getPlace();
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});

nomNow.controller('mapController', function ($scope, $location, $q, Map) {
  $scope.createMap = function() {
    return Map.createMap();
  }

  $scope.findWaitTimes = function() {
    Map.findWaitTimes($scope)
  }

  $scope.createMap()
    .then(function() {
      $scope.findWaitTimes()
      $scope.gPlace;

    });

});

