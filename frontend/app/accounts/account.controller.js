(function () {
    'use strict';

    angular.module('myApp.accounts')
        .controller('myApp.account.controller', ['myApp.accounts.service', 'myApp.accounts.service.data', '$routeParams', function (service, data, $routeParams) {
            var scope = this;
            scope.refreshAccount = function () {
                service.getAccount($routeParams.accountId)
                    .then(function (account) {
                        scope.account = account;
                    });
            };

            scope.resetForm = function (form) {
                if(form){
                    form.$setPristine();
                    form.$setUntouched();
                }
                scope.account = null;
            };
        }]);
})();