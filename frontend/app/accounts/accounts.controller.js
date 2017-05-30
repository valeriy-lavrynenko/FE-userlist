(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('accountsController',
            ['accountsDataFactory', '$rootScope', 'accountEvents', 'modalConstants', 'bsLoadingOverlayService', '$timeout',
                function (accountsDataFactory, $rootScope, accountEvents, modalConstants, bsLoadingOverlayService, $timeout) {
                    var scope = this;
                    scope.txt = modalConstants;
                    bsLoadingOverlayService.start({referenceId: 'accounts'});

                    scope.createAccount = function () {
                        $rootScope.$emit(accountEvents.createModal);
                    };

                    $rootScope.$on(accountEvents.updateAll, function (event, data) {
                        scope.accounts = data;
                        bsLoadingOverlayService.stop({referenceId: 'accounts'});
                    });

                    accountsDataFactory.getAccounts().$promise
                        .then(function (accounts) {
                            return $timeout(function () {}, 1000)
                                .then(function () {
                                    $rootScope.$emit(accountEvents.updateAll, accounts);
                                });
                        })

                }]);
})();