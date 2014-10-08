angular.module('angularCurrency.directives', []).directive('currancySelect', ['$cookieStore', 'CurrencyService',
	function($cookieStore, CurrencyService) {
		return {
			restrict: 'A',
			link: function(scope, iElement, iAttrs) {},
			controller: function($scope) {

				// List of curruncies
				$scope.list = CurrencyService.list;

				$scope.selectedCurrency = $scope.list['USD'];

				// Set the currency rate value inside the service
				$scope.setCurrency = function(currency) {
					console.log(currency);
					CurrencyService.fetchRates(currency.code).then(function(rate) {
						$scope.selectedCurrency = currency;
						$cookieStore.put('currencyCode', currency.code);
					});
				}

				var codeFromCookie = $cookieStore.get('currencyCode');
				console.log("codeFromCookie",codeFromCookie);
				if (codeFromCookie) {
					$scope.selectedCurrency = $scope.list[codeFromCookie];
				}

				$scope.setCurrency($scope.selectedCurrency);
			},
			// Template is optional for the user to choose whatever he wants
			templateUrl: 'currency-options.html'
		};
	}
])