(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('accountsController',
            ['accountsDataFactory', '$rootScope', 'accountEvents', 'modalConstants',
                function (accountsDataFactory, $rootScope, accountEvents, modalConstants) {
                    var scope = this;
                    scope.txt = modalConstants;

                    scope.createAccount = function () {
                        $rootScope.$emit(accountEvents.createModal);
                    };

                    $rootScope.$on(accountEvents.update, function (event, data) {
                        scope.accounts = data;
                    });

                    accountsDataFactory.getAccounts().$promise
                        .then(function (accounts) {
                            $rootScope.$emit(accountEvents.update, accounts);
                        });
                }]);
})();