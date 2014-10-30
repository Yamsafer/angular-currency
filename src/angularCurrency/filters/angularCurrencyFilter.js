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