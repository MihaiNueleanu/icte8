(function () {

	var app = angular.module('suse', [
		'companiesCtrl',
		'companyCtrl',
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
	    .when('/company/new', {
	        templateUrl: 'administrator/static/views/company/index.html',
	        controller: 'companyCtrl'
	    })
	    .when('/company/:id', {
	        templateUrl: 'administrator/static/views/company/index.html',
	        controller: 'companyCtrl'
	    })
	    .when('/users', {
	        templateUrl: 'administrator/static/views/users/index.html',
	        controller: 'usersCtrl'
	    });
	}]);

})();