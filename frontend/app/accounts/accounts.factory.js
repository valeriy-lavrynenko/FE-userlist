(function () {
    'use strict';

    angular.module('accountsModule')
        .factory('accountsDataFactory', ['coreConfig', '$resource',
            function (config, $resource) {
                return $resource(config.backendAddress + 'account/:id', null,
                    {
                        getAccounts: {method: 'GET', isArray: true},
                        getAccount: {method: 'GET', transformResponse: function (rawResponceBody) {
                            var account = angular.fromJson(rawResponceBody);
                            account.activities.sort(function (a, b) {
                                return Date.parse(a.date) - Date.parse(b.date);
                            });
                            return account;
                        }},
                        createAccount: {method: 'POST'},
                        updateAccount: {method: 'PUT'},
                        removeAccount: {method: 'DELETE'}
                    });
            }])
})();

