angular.module('angularCurrency.filters', []).filter('Ycurrency', function($filter, $sce, CurrencyService) {
	return function(input) {
		if (CurrencyService.getRate()) {
			var rate = CurrencyService.getRate(),
				value = rate.rate,
				newValue = input * value,
				symbol = " <span class='currency-symbol' >" + rate.code + "</span> ";

			$rootScope.$broadcast('currency:changed');

			return $filter('currency')(newValue, symbol);
		} else {
			return input;
		}
	};

});