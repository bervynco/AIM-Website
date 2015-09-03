var webApp = angular.module('webApp', 
  []);

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

    $scope.dataHandler = function(productData){
      for(var i = 0; i < productData.length; i++){
        if(productData[i].groupName == "Tooling"){
          toolingItems.push(productData[i]);
          groupItemsTooling.push(productData[i].groupItem);
          
        }
        else if(productData[i].groupName == "Cleanroom and Packaging"){
          cleanItems.push(productData[i]);
          groupItemsCleanPack.push(productData[i].groupItem);
        }    
      }
      for(var k = 0; k < groupItemsTooling.length; k++){
        var object = groupItemsTooling[k];
        if(!_.contains(temp, object)){
          temp.push(object);
        }
      }
      for(var k = 0; k < groupItemsCleanPack.length; k++){
        var object = groupItemsCleanPack[k];
        if(!_.contains(temp1, object)){
          temp1.push(object);
        }
      }
      $scope.toolingItems = toolingItems;
      $scope.cleanItems = cleanItems;

      $scope.groupItemsTooling = temp;
      $scope.groupItemsCleanPack = temp1;
      
      console.log($scope.groupItemsTooling.length);
      console.log($scope.groupItemsCleanPack.length);
    }

    ProductFactory.getProductData().then(function(data){
      $scope.dataHandler(data);
    });
}]);
