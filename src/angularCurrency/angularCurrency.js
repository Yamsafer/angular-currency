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