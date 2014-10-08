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
angular.module('angularCurrency.filters', []).filter('Ycurrency', function($filter, $sce, CurrencyService) {
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
 angular.module('angularCurrency.services', []).factory('CurrencyService', ["$http", "$q",
 	function($http, $q) {

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
 		}
 	

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
 			var url = "https://yamsafer.me/currencies/show/" + currencyCode
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