(function () {
    'use strict';

    angular.module('myApp.accounts')
        .controller('myApp.account.controller',
            ['myApp.accounts.service', 'myApp.accounts.service.data', 'myApp.accounts.service.accountToLoad', '$routeParams',
                function (service, data, accountToLoad, $routeParams) {
                    var scope = this;

                    scope.editAccount = function (account) {
                        accountToLoad.load(account);
                    };
                    data.refreshAccount($routeParams.accountId);
                    scope.data = data;
                }]);
})();