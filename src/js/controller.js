
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
 $http.get('api.steampowered.com//ISteamUser//GetPlayerSummaries//v0002//?key=9C85A6F10DBDC9974844B8320BFE27C7&steamids=76561198073438638')
       .then(function(res){
          $scope.todos = res.personaname;                
        });
       console.log($scope.todos);
});