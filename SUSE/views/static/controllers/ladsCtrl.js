/*****************************************************************/
/** Single Company Controller                                     /
/*****************************************************************/
angular.module('ladsCtrl', ['ngRoute'])

.controller("ladsCtrl", ['$scope','$http','$routeParams','$location', function ($scope,$http,$routeParams,$location) {
	console.log('============> LADs Controller');
	$scope.companyId = $routeParams.id;
	$scope.company = {};
	$scope.isNew = false; 

	//URLs
	var url = '/company/'+ $scope.companyId +'/lads';
	var urlNew = '/company/'+ $scope.companyId +'/lads/new';

    //Loading LADs into the page
    $http.get(url).success(function(data) {
        console.log(data);
        $scope.company = data;
    });

}]);