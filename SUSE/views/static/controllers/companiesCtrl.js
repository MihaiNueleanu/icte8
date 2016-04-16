/*****************************************************************/
/** Multiple Companies Controller                                 /
/*****************************************************************/
angular.module('companiesCtrl', ['ngRoute'])

.controller("companiesCtrl", ['$scope','$http','$routeParams','$location', function ($scope,$http,$routeParams,$location) {
	$scope.param = $routeParams.param;
	console.log('============> Companies List Controller');

	//todo
}]);