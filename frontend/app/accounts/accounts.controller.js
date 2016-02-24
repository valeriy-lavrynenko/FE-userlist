(function () {
    'use strict';

    angular.module('myApp.accounts')
        .controller('myApp.accounts.controller', ['myApp.accounts.service', 'myApp.accounts.service.data', function (service, data) {
            var scope = this;
            scope.refreshAccounts = function () {
                service.getAccounts()
                    .then(function (accounts) {
                        data.accounts = accounts;
                    });
            };

            scope.createAccount = function (account) {
                service.createAccount(account)
                    .then(function () {
                        scope.refreshAccounts();
                    })
            };

            scope.resetForm = function (form) {
                if(form){
                    form.$setPristine();
                    form.$setUntouched();
                }
                scope.account = null;
            };



            scope.data = data;
        }]);
})();