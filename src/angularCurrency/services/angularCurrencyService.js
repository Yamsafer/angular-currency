 angular.module('angularCurrency.services', []).factory('CurrencyService', ["$http", "$q",
 	function($http, $q) {

 		// The public party of the service
 		currencyService = {};

 		// Rate object, jolds the selected rate object
 		var rate = null;

 		// List of curruncies
 		currencyService.list = [
 			{
 				name: "United States Dollar",
 				code: "USD",
 				icon: "flag-us"
 			}, {
 				name: "Saudi Arabia Riyal",
 				code: "SAR",
 				icon: "flag-sa"
 			}, {
 				name: "Kuwait Dinar",
 				code: "KWD",
 				icon: "flag-kw"
 			}, {
 				name: "United Arab Emirates Dirham",
 				code: "AED",
 				icon: "flag-ae"
 			}, {
 				name: "Bahrain Dinar",
 				code: "BHD",
 				icon: "flag-bh"
 			}, {
 				name: "Qatar Riyal",
 				code: "QAR",
 				icon: "flag-qa"
 			}, {
 				name: "Oman Rial",
 				code: "OMR",
 				icon: "flag-om"
 			}, {
 				name: "Jordan Dinar",
 				code: "JOD",
 				icon: "flag-jo"
 			}, {
 				name: "Israel Shekel",
 				code: "ILS",
 				icon: "flag-ps"
 			}, {
 				name: "Egypt Pound",
 				code: "EGP",
 				icon: "flag-eg"
 			}, {
 				name: "Turkey Lira",
 				code: "TRY",
 				icon: "flag-tr"
 			}, {
 				name: "Lebanon Pound",
 				code: "LBP",
 				icon: "flag-lb"
 			}, {
 				name: "Tunisia Dinar",
 				code: "TND",
 				icon: "icon-tn"
 			}, {
 				name: "Morocco Dirham",
 				code: " MAD",
 				icon: "flag-ma",
 			}, {
 				name: "Euro",
 				code: "EUR",
 				icon: "flag-ey"
 			}, {
 				name: "United Kingdom Pound",
 				code: "GBP",
 				icon: "flag-gb"
 			}
 		];

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