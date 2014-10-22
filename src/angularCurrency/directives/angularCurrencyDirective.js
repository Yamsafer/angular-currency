angular.module('angularCurrency.directives', []).directive('currancySelect', ['$cookieStore', 'CurrencyService',
	function($cookieStore, CurrencyService) {
		return {
			restrict: 'A',
			link: function(scope, iElement, iAttrs) {},
			controller: function($scope) {



				// List of curruncies
				$scope.list = CurrencyService.list;

				$scope.setCurrency = function(currency) {
					CurrencyService.fetchRates(currency.code).then(function(rate) {
						$scope.selectedCurrency = $scope.list[rate.code];
						$cookieStore.put('currencyCode', currency.code);
					});
				}

				// Check if cookie has any value
				var codeFromCookie = $cookieStore.get('currencyCode');
				if (codeFromCookie) {

					$scope.selectedCurrency = $scope.list[codeFromCookie];
					console.log($scope.selectedCurrency);
					$scope.setCurrency($scope.selectedCurrency);
				} else {
					// Get default value
					CurrencyService.fetchRates().then(function(rate) {
						$scope.selectedCurrency = $scope.list[rate.code];
						$cookieStore.put('currencyCode', rate.code);
					});
				}



			},
			// Template is optional for the user to choose whatever he wants
			templateUrl: 'currency-options.html'
		};
	}
])