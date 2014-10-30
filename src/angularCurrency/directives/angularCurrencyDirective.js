angular.module('angularCurrency.directives', []).directive('currancySelect', ['CurrencyService',
	function(CurrencyService) {
		return {
			restrict: 'A',
			link: function(scope, iElement, iAttrs) {},
			controller: function($scope,$rootScope) {



				// List of curruncies
				$scope.list = CurrencyService.list;

				$scope.setCurrency = function(currency) {
					CurrencyService.fetchRates(currency.code).then(function(rate) {
						$scope.selectedCurrency = $scope.list[rate.code];
						setCookie('currencyCode', currency.code);
						$rootScope.$broadcast('currency:changed');

					});
				}

				// Check if cookie has any value
				var codeFromCookie = getCookie('currencyCode');
				if (codeFromCookie) {
					$scope.selectedCurrency = $scope.list[codeFromCookie];
					console.log($scope.selectedCurrency);
					$scope.setCurrency($scope.selectedCurrency);
				} else {
					// Get default value
					CurrencyService.fetchRates().then(function(rate) {
						$scope.selectedCurrency = $scope.list[rate.code];
						setCookie('currencyCode', rate.code);
					});
				}



				function getCookie(cname) {
					var name = cname + "=";
					var ca = document.cookie.split(';');
					for (var i = 0; i < ca.length; i++) {
						var c = ca[i];
						while (c.charAt(0) == ' ') c = c.substring(1);
						if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
					}
					return "";
				}

				function setCookie(cname, cvalue, exdays) {
					var d = new Date();
					d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
					var expires = "expires=" + d.toUTCString();
					document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/"
					console.log(document.cookie);
				}


			},
			// Template is optional for the user to choose whatever he wants
			templateUrl: 'currency-options.html'
		};
	}
])