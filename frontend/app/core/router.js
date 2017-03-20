(function () {
    'use strict';

    angular.module('myApp')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                when('/accounts', {
                    templateUrl: 'app/accounts/view/accounts.html',
                    controller: 'accountsController as accountsVm'
                }).
                when('/accounts/:accountId', {
                    templateUrl: 'app/accounts/view/account.html',
                    controller: 'accountController as accountVm'
                }).
                otherwise({
                    redirectTo: '/accounts'
                });
            }]);
})();