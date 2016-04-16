/*****************************************************************/
/** Multiple Companies Controller                                 /
/*****************************************************************/
angular.module('usersCtrl', ['ngRoute'])

.controller("usersCtrl", ['$scope','$http','$routeParams','$location', function ($scope,$http,$routeParams,$location) {
	$scope.param = $routeParams.param;
	console.log('============> Companies List Controller');

	//todo
}]);