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
 				code: "MAD",
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

 			var url = Yamsafer.baseUrl + "currencies/show";

 			currencyCode ? (url += "/" + currencyCode) : (url = url);
 		
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

 		currencyService.convertToNewCurrency = function(value, rate) {
 			var newValue = value * rate ;
 			return newValue.toFixed(2);
 		};

 		currencyService.convertToUSD = function(value, rate) {
 			var usdValue = value/rate;
 			return usdValue.toFixed(2);
 		};

 		return currencyService;
 	}
 ])
 