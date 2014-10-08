var app = angular.module('demo', ['angularCurrency']);

app.controller('demoCtrl', ['$scope',
	function($scope) {
		$scope.val = 1000;
	}
])