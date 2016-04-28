/*****************************************************************/
/** Multiple Companies Controller                                 /
/*****************************************************************/
angular.module('companiesCtrl', ['ngRoute'])

.controller("companiesCtrl", ['$scope','$http','$routeParams','$location', function ($scope,$http,$routeParams,$location) {
	console.log('============> Companies List Controller');
	$scope.param = $routeParams.param;
	$scope.companies = {};

	//URLs
	var url = '/companies/';

    $http.get(url).success(function(data) {
        $scope.companies = data;
    });

}]);