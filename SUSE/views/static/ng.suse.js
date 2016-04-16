(function () {

	var app = angular.module('suse', [
		'companiesCtrl',
		'usersCtrl'
	]);

	/* configuring route provider (views) */
	app.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider
	    .when('/', {
	        templateUrl: 'administrator/static/views/index.html'    })
	    .when('/companies', {
	        templateUrl: 'administrator/static/views/companies/index.html',
	        controller: 'companiesCtrl'
	    })
	    .when('/users', {
	        templateUrl: 'administrator/static/views/users/index.html',
	        controller: 'usersCtrl'
	    });
	}]);

})();