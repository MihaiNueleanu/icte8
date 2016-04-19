/*****************************************************************/
/** Single LAD Controller                                     /
/*****************************************************************/
angular.module('ladCtrl', ['ngRoute'])

.controller("ladCtrl", ['$scope','$http','$routeParams','$location', function ($scope,$http,$routeParams,$location) {
	console.log('============> Single LAD Controller');
	$scope.companyId = $routeParams.companyId;
    $scope.ladId = $routeParams.ladId;
	$scope.lad = {};
	$scope.isNew = false; 
    $scope.chartData = {
        oil:[],
        pressure:[],
        gas:[],
        smoke:[],
    };
    $chartOptions = {};


	//URLs
	var url = '//localhost:2000/company/' + $scope.companyId + '/lad/' + $scope.ladId;
    var urlNew = '//localhost:2000/company/' + $scope.companyId + '/lad/new' ;

    //Loading company into the page
    if($scope.ladId != 'new' && $scope.ladId){
        $scope.isNew = false;
        $http.get(url).success(function(data) {
            $scope.lad = data;

            //Chart data
            console.log(data.detector[0].data);
            for(i=0;i<data.detector[0].data.length; i++){
                var timestamp   = new Date( data.detector[0].data[i].timestamp ).getTime() ;
                var oil         = data.detector[0].data[i].oil;
                var pressure    = data.detector[0].data[i].pressure;
                var gas         = data.detector[0].data[i].gas;
                var smoke       = data.detector[0].data[i].smoke;
                
                $scope.chartData.oil.push([ timestamp , oil ]);
                $scope.chartData.pressure.push([ timestamp , pressure ]);
                $scope.chartData.gas.push([ timestamp , gas ]);
                $scope.chartData.smoke.push([ timestamp , smoke ]);
            }
            console.log($scope.chartData);

            //Highcharts
            $scope.chartOptions = {
               xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: 'Date and time'
                    }
                },
                title: {
                    text: 'Detector data'
                },

                series: [{
                    name: "Oil",
                    data: $scope.chartData.oil
                },{
                    name: "Smoke",
                    data: $scope.chartData.smoke
                },{
                    name: "Gas",
                    data: $scope.chartData.gas
                },{
                    name: "Pressure",
                    data: $scope.chartData.pressure
                },]
            };
            
        });
    }else{
        $scope.isNew = true;
        $scope.lad = {
        	name : 'Company name',
        	description : 'Company description'
        };
    }

    $scope.saveItem = function(){
	   	$http.post(url + $scope.id,$scope.lad).success(function(data) {		    
            console.log('saved item');
            $location.search({});
            $location.path( '/companies' );
    	});
    }
    $scope.saveNewItem = function(){
        $http.post(urlNew,$scope.lad).success(function(data) {
			console.log('saved NEW item');
            $location.search( {} );
            $location.path( '/companies' );
        });
    }

}])
.directive('hchart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
});