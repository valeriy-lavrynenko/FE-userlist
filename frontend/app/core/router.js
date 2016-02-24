(function () {
    'use strict';

    angular.module('myApp')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                when('/accounts', {
                    templateUrl: 'app/accounts/view/accounts.html',
                    controller: 'myApp.accounts.controller as ac'
                }).
                when('/accounts/:accountId', {
                    templateUrl: 'app/accounts/view/account.html',
                    controller: 'myApp.account.controller as ac'
                }).
                otherwise({
                    redirectTo: '/accounts'
                });
            }]);
})();