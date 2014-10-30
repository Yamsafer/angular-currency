(function() {


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('angularCurrency.config', [])
    .value('angularCurrency.config', {
        debug: true
    });

// Modules
angular.module('angularCurrency.directives', []);
angular.module('angularCurrency.filters', []);
angular.module('angularCurrency.services', []);
angular.module('angularCurrency', [
    'angularCurrency.config',
    'angularCurrency.directives',
    'angularCurrency.filters',
    'angularCurrency.services',
    'ngCookies',
    'ngSanitize'
]);
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
angular.module('angularCurrency.filters', []).filter('Ycurrency', function($filter, $sce,$rootScope, CurrencyService) {
	return function(input) {
		if (CurrencyService.getRate()) {
			var rate = CurrencyService.getRate(),
				value = rate.rate,
				newValue = input * value,
				symbol = " <span class='currency-symbol' >" + rate.code + "</span> ";


			return $filter('currency')(newValue, symbol);
		} else {
			return input;
		}
	};

});
 angular.module('angularCurrency.services', []).factory('CurrencyService', ["$log","$http", "$q",
 	function($log,$http, $q) {

 		// The public party of the service
 		currencyService = {};

 		// Rate object, jolds the selected rate object
 		var rate = null;

 		// List of curruncies
 		currencyService.list = {
 			USD: {
 				name: "United States Dollar",
 				code: "USD",
 				icon: "flag-us"
 			},
 			SAR: {
 				name: "Saudi Arabia Riyal",
 				code: "SAR",
 				icon: "flag-sa"
 			},
 			KWD: {
 				name: "Kuwait Dinar",
 				code: "KWD",
 				icon: "flag-kw"
 			},
 			AED: {
 				name: "United Arab Emirates Dirham",
 				code: "AED",
 				icon: "flag-ae"
 			},
 			BHD: {
 				name: "Bahrain Dinar",
 				code: "BHD",
 				icon: "flag-bh"
 			},
 			QAR: {
 				name: "Qatar Riyal",
 				code: "QAR",
 				icon: "flag-qa"
 			},
 			OMR: {
 				name: "Oman Rial",
 				code: "OMR",
 				icon: "flag-om"
 			},
 			JOD: {
 				name: "Jordan Dinar",
 				code: "JOD",
 				icon: "flag-jo"
 			},
 			ILS: {
 				name: "Israel Shekel",
 				code: "ILS",
 				icon: "flag-ps"
 			},
 			EGP: {
 				name: "Egypt Pound",
 				code: "EGP",
 				icon: "flag-eg"
 			},
 			TRY: {
 				name: "Turkey Lira",
 				code: "TRY",
 				icon: "flag-tr"
 			},
 			LBP: {
 				name: "Lebanon Pound",
 				code: "LBP",
 				icon: "flag-lb"
 			},
 			TND: {
 				name: "Tunisia Dinar",
 				code: "TND",
 				icon: "icon-tn"
 			},
 			MAD: {
 				name: "Morocco Dirham",
 				code: " MAD",
 				icon: "flag-ma",
 			},
 			EUR: {
 				name: "Euro",
 				code: "EUR",
 				icon: "flag-ey"
 			},
 			GBP: {
 				name: "United Kingdom Pound",
 				code: "GBP",
 				icon: "flag-gb"
 			}
 		};
 	

 		currencyService.addToList = function(obj) {
 			currencyService.list.push(obj);
 		}

 		currencyService.removeFromList = function(code) {
 			angular.forEach(currencyService.list, function(item, index) {
 				if (item.code == code) {
 					currencyService.list.splice(index, 1);
 				}
 			})
 		}

 		currencyService.fetchRates = function(currencyCode) {
 			var deferred = $q.defer();

 			var url = "https://yamsafer.me/currencies/show";

 			currencyCode ? (url += "/" + currencyCode) : (url = url);

 			console.log(url);
 		
 			$http({
 				method: 'GET',
 				url: url
 			}).
 			success(function(data, status, headers, config) {
 				rate = data;
 				deferred.resolve(data);
 			}).
 			error(function(data, status, headers, config) {
 				deferred.reject(data);
 				$log.error(data, status);
 			});
 			return deferred.promise;
 		}

 		currencyService.getRate = function() {
 			return rate;
 		}

 		return currencyService;
 	}
 ])
}());