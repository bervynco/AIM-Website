var inventorySystemApp = angular.module('webApp', 
  ['ui.router']);
inventorySystemApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/notfound");
  //
  // Now set up the states
  $stateProvider
    .state('mainpage', {
    	cache: false,
      	url: "/mainpage",
      	templateUrl: "mainpage.html"
    })
    .state('about_us', {
    	cache: false,
      	url: "/aboutus",
      	templateUrl: "aboutus.html"
    })
  	.state('products', {
  		cache: false,
        	url: "/products",
        	templateUrl: "products.html"
  	})
  	.state('contact_us', {
  		cache: false,
        	url: "/contactus",
        	templateUrl: "contactus.html"
  	});  
});