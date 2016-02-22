(function () {
    'use strict';

    angular.module('myApp.accounts')
        .service('myApp.accounts.service', ['$http', '$q', 'myApp.core.config.accountsData', function ($http, $q, accountsData) {
            this.getAccounts = function () {
                return $q(function (resolve, reject) {
                    resolve(accountsData);
                })
            };
        }])
})();

