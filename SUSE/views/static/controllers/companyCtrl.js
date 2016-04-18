/*****************************************************************/
/** Single Company Controller                                     /
/*****************************************************************/
angular.module('companyCtrl', ['ngRoute'])

.controller("companyCtrl", ['$scope','$http','$routeParams','$location', function ($scope,$http,$routeParams,$location) {
	console.log('============> Single Company Controller');
	$scope.id = $routeParams.id;
	$scope.company = {};
	$scope.isNew = false; 

	//URLs
	var url = '//localhost:2000/company/';
	var urlNew = '//localhost:2000/company/new';

    //Loading company into the page
    if($scope.id != 'new' && $scope.id){
        $scope.isNew = false;
        $http.get(url + $scope.id).success(function(data) {
            $scope.company = data;
        });
    }else{
        $scope.isNew = true;
        $scope.company = {
        	name : 'Company name',
        	description : 'Company description'
        };
    }

    $scope.saveItem = function(){
	   	$http.post(url + $scope.id,$scope.company).success(function(data) {		    
            console.log('saved item');
            $location.search({});
            $location.path( '/companies' );
    	});
    }
    $scope.saveNewItem = function(){
        $http.post(urlNew,$scope.company).success(function(data) {
			console.log('saved NEW item');
            $location.search( {} );
            $location.path( '/companies' );
        });
    }

}]);