/*****************************************************************/
/** Single Company Controller                                     /
/*****************************************************************/
angular.module('accountsCtrl', ['ngRoute'])
.controller("accountsCtrl", ['$scope','$http','$routeParams','$location', function ($scope,$http,$routeParams,$location) {
	console.log('============> LADs Controller');
	$scope.companyId = $routeParams.id;
	$scope.accounts = {};
	$scope.isNew = false; 

	//URLs
	var url = '/accounts/';

    //Loading LADs into the page
    $http.get(url).success(function(data) {
        console.log(data);
        $scope.accounts = data;
    });

}]);