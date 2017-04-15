//TODO: Move to service
(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('modalController',
            ['accountsDataFactory', '$location', '$rootScope',
                function (accountsDataFactory, $location, $rootScope) {

                    var scope = this,
                        reloadAccounts = function () {
                            return accountsService.getAccounts().$promise
                                .then(function (accounts) {
                                    $rootScope.$emit('accounts:update', accounts);
                                });
                        },
                        reloadAccount = function (account) {
                            $rootScope.$emit('account:update', account);
                            return reloadAccounts();
                        };


                    scope.createAccount = function () {
                        return accountsService.createAccount(scope.account).$promise
                            .then(function () {
                                return reloadAccounts();
                            })
                    };

                    scope.updateAccount = function () {
                        // TODO: disable  buttons
                        // TODO: show spinner or progress indicator

                        return accountsService.updateAccount({id: scope.account.id}, scope.account).$promise
                            .then(function () {
                                scope.resetForm();
                                return reloadAccount(account);
                            })
                            .finally(function () {
                                // TODO: remove spinner or else
                            });
                    };

                    scope.removeCurrentAccount = function () {
                        return accountsService.removeAccount({id: scope.account.id}).$promise
                            .then(function () {
                                return reloadAccounts();
                            })
                            .then(function () {
                                $location.url('/accounts')
                            })
                    };

                    scope.resetForm = function () {
                        var form = scope.accountEditForm;
                        scope.account = {
                            name: '',
                            login: '',
                            age: '',
                            gender: '',
                            phoneNumber: '',
                            email: ''
                        };
                        if (form) {
                            form.$setPristine(true);
                            form.$setUntouched(true);
                        }
                    };

                    scope.mode = new function () {
                        var mode = 'create';

                        this.isCreate = function () {
                            return mode == 'create';
                        };

                        this.isEdit = function () {
                            return mode == 'edit';
                        };

                        this.setCreate = function () {
                            mode = 'create';
                        };

                        this.setEdit = function () {
                            mode = 'edit';
                        }
                    };

                    $rootScope.$on('account:edit', function (event, data) {
                        scope.account = data;
                        scope.mode.setEdit();
                    });

                    $rootScope.$on('account:create', function (event, data) {
                        scope.account = {};
                        scope.mode.setCreate();
                        scope.resetForm();
                    })

                }
            ]);
})();