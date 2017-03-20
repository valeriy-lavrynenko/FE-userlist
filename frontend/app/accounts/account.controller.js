(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('accountController',
            ['accountsDataFactory', '$routeParams', '$rootScope',
                function (accountsDataFactory, $routeParams, $rootScope) {
                    var scope = this;

                    scope.editAccount = function () {
                        $rootScope.$emit('account:edit', angular.copy(scope.account));
                    };

                    $rootScope.$on('account:update', function (event, data) {
                        scope.account = data;
                    });

                    accountsDataFactory.getAccount({id: $routeParams.accountId}).$promise
                        .then(function (account) {
                            $rootScope.$emit('account:update', account);
                        });
                }]);
})();