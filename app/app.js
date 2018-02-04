var myNinjaApp = angular.module('myNinjaApp',['ngRoute','ngAnimate']);

myNinjaApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

  $locationProvider.html5Mode(true);


  $routeProvider.when('/home',{
    templateUrl:'views/home.html',
    controller:'NinjaController'
  }).
  when('/directory',{
    templateUrl:'views/directory.html',
    controller:'NinjaController'
  }).
  when('/contact',{
    templateUrl:'views/contact.html',
        controller:'ContactController'
  }).
  when('/contact-success',{
    templateUrl:'views/contact-success.html',
    controller:'ContactController'
  })
  .otherwise({
    redirectTo:'/home'
  })
}])

myNinjaApp.directive('randomNinja',[function(){
   return {
     restrict:'E',
     scope:{
       ninjas:'=',
       title:'='
     },
     transclude:true,
     replace:true,
     templateUrl:'views/random.html',
     controller:function($scope){
       $scope.random = Math.floor(Math.random() * 4);
     }
   }
}]);

myNinjaApp.controller('NinjaController',['$scope','$http',function($scope,$http){


  $scope.removeNinja = function(ninja){
    var removed = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removed,1);
  };

 $scope.addNinja = function(){
   $scope.ninjas.push(
     {
       name:$scope.newNinja.name,
       belt:$scope.newNinja.belt,
       rate:parseFloat($scope.newNinja.rate),
       available:true
     }
   )
   $scope.newNinja.name="";
   $scope.newNinja.belt="";
   $scope.newNinja.rate="";
 }
  $scope.removeAll = function(){
  $scope.ninjas=[];
}
  $http.get("data/ninjas.json").then(function(res){
      $scope.ninjas = res.data;
  })
}])

myNinjaApp.controller('ContactController',['$location','$scope',function($location,$scope){
     $scope.sendMessage = function(){
       $location.path('/contact-success');
     }

}]);
