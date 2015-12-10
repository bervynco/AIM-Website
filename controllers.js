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
