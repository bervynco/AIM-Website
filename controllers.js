var webApp = angular.module('webApp', 
  ['ui.bootstrap']);

webApp.factory('ProductFactory',function($http){
    var productData = $http.get('data/products.json').then(function(response) {
        return response.data;
    });

    var factory = {}; // define factory object
    var userInformation = {};
    factory.getProductData = function() {
      return productData;
    }
    
    return factory; // returning factory to make it ready to be pulled by the controller
    
});

//14.591158, 120.996992
webApp.factory('MapFactory', function(){
    var mapOptions = {
                zoomControl: true,
                zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.MEDIUM,
                            position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                panControl: true,
                panControlOptions:{
                            style: google.maps.ZoomControlStyle.MEDIUM,
                            position: google.maps.ControlPosition.LEFT_CENTER
                },
                zoom: 18,
                center: new google.maps.LatLng(14.591143, 120.997083),
                mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    // Create the legend and display on the map
    
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    return map;
    
});
webApp.controller('MapController',
  function($scope, MapFactory){
    var map = MapFactory;
    google.maps.event.addDomListener(window, "load", map);
    map.setCenter(new google.maps.LatLng(14.591143, 120.997083));
    var myLatLng = {lat: 14.591143, lng: 120.997083};
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map
    });
});
webApp.controller('ProductController', ['$scope', 'ProductFactory',
  function($scope, ProductFactory){

    //grouping data
    $scope.toolingItems = {};
    $scope.cleanItems = {};
    var toolingItems = [];
    var cleanItems = [];

    //get group names
    var groupItemsTooling = [];
    $scope.groupItemsTooling = {};
    var temp = [];

    var groupItemsCleanPack = [];
    $scope.groupItemsCleanPack = {};
    var temp1 = [];
    $scope.productData;
    console.log("PRODUCT CONTROLLER");
    $scope.dataHandler = function(productData){
      console.log(productData);
      $scope.productData = productData;
      console.log($scope.productData);
    }

    ProductFactory.getProductData().then(function(data){
      $scope.dataHandler(data);
    });
}]);
