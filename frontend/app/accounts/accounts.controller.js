(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('accountsController', ['accountsDataFactory', '$rootScope', function (accountsDataFactory, $rootScope) {
            var scope = this;

            scope.createAccount = function () {
                $rootScope.$emit('account:create');
            };

            $rootScope.$on('accounts:update', function (event, data) {
                scope.accounts = data;
            });

            accountsDataFactory.getAccounts().$promise
                .then(function (accounts) {
                    $rootScope.$emit('accounts:update', accounts);
                });
        }]);
})();