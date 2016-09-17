
var cities = [
    {
        city : 'copenhagen',
        desc : 'Copenhagen is the capital and most populated city of Denmark, and second largest in Scandinavia',
        lat : 55.6761,
        long :  12.5683
    },
    {
        city : 'Oslo',
        desc : 'The capital of Norway and most populous city in Norway',
        lat : 59.9500,
        long :  10.7500
    },
    {
        city : 'Budapest',
        desc : 'Budapest is the capital and the largest city of Hungary, and one of the largest cities in the European Union.',
        lat : 47.4925,
        long : 19.0514
    },
    {
        city : 'Frankfurt',
        desc : 'The largest city in the German state of Hessen and the fifth-largest city in Germany',
        lat : 50.1167,
        long :  8.6833
    },
    {
        city : 'Milan',
        desc : 'The second-most populous city in Italy and the capital of Lombardy',
        lat : 45.4667,
        long : 9.1667
    }
];

var destinations = [];


var appgoogle = angular.module('mapsApp', []);
    appgoogle.controller('MapCtrl', function ($scope) {

        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(52.5167, 13.3833),
            mapTypeId: google.maps.MapTypeId.ROADMAP,

        }


        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];
       // $scope.polylines = [];


        var destinations = [];
        destinations.push(new google.maps.LatLng(59.9500, 10.7500));
        destinations.push(new google.maps.LatLng(47.4925, 19.051));
        destinations.push(new google.maps.LatLng(45.4667, 9.1667));
        destinations.push(new google.maps.LatLng(50.1167, 8.6833));
		destinations.push(new google.maps.LatLng(55.6761, 12.5683));
        


        var infoWindow = new google.maps.InfoWindow();

        var createlines = function () {

            var polylineOptions = {path: destinations, strokeColor: "#ff0000"};
            var polyline = new google.maps.Polyline(polylineOptions);
            polyline.setMap($scope.map);
        }


        var createMarker = function (info){

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.city
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);



        }
createlines();
        for (i = 0; i < cities.length; i++){
            createMarker(cities[i]);

        }


        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

    });