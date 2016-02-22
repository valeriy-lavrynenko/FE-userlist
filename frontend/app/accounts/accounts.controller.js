(function () {
    'use strict';

    angular.module('myApp.accounts')
        .controller('myApp.accounts.controller', ['myApp.accounts.service', function (service) {
            var scope = this;
            service.getAccounts()
                .then(function (accounts) {
                    scope.accounts = accounts;
                });
        }]);
})();