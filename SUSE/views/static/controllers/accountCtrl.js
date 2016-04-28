/*****************************************************************/
/** Single Company Controller                                     /
/*****************************************************************/
angular.module('accountCtrl', ['ngRoute'])

.controller("accountCtrl", ['$scope','$http','$routeParams','$location', function ($scope,$http,$routeParams,$location) {
	console.log('============> Single Account Controller');
	$scope.id = $routeParams.id;
	$scope.account = {};

	//URLs
	var url = '/account/';

    //Loading account into the page
    $http.get(url + $scope.id).success(function(data) {
        $scope.account = data;
        console.log(data);
    });

    $scope.saveItem = function(){
	   	$http.post(url + $scope.id,$scope.account).success(function(data) {		    
            console.log('saved item');
            $location.search({});
            $location.path( '/companies' );
    	});
    }


}]);