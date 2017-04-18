//TODO: Move to service
(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('modalController',
            ['accountsDataFactory', '$location', '$rootScope', '$uibModal',
                function (accountsDataFactory, $location, $rootScope, $uibModal) {

                    var scope = this,
                        reloadAccounts = function () {
                            return accountsDataFactory.getAccounts().$promise
                                .then(function (accounts) {
                                    $rootScope.$emit('accounts:update', accounts);
                                });
                        },
                        reloadAccount = function (account) {
                            $rootScope.$emit('account:update', account);
                            return reloadAccounts();
                        };

                    scope.removeCurrentAccount = function () {

                    };

                    var modalInstance = function (account, mode) {
                        return $uibModal.open({
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/accounts/view/modal-edit.html',
                            bindToController: true,
                            controller: function () {
                                this.account = account;
                                this.mode = {
                                    mode: mode,
                                    isCreate: function () {
                                        return mode == 'create';
                                    },
                                    isEdit: function () {
                                        return mode == 'edit';
                                    }
                                }
                            },
                            controllerAs: 'modalVm',
                            size: 'md'

                        })
                    };


                    $rootScope.$on('account:edit', function (event, data) {
                        var modal = modalInstance(data, 'edit');
                        modal.result
                            .then(function (account) {
                                // TODO: disable  buttons
                                // TODO: show spinner or progress indicator
                                return accountsDataFactory.updateAccount({id: account.id}, account).$promise
                                    .then(function () {
                                        return reloadAccount(account);
                                    });
                            })
                            .finally(function () {
                                // TODO: remove spinner or else
                            });
                    });

                    $rootScope.$on('account:create', function (event, data) {
                        var modal = modalInstance({}, 'create');

                        modal.result
                            .then(function (account) {
                                return accountsDataFactory.createAccount(account).$promise;
                            })
                            .then(function () {
                                return reloadAccounts();
                            });

                    });

                    $rootScope.$on('account:delete', function (event, data) {
                        var modal = $uibModal.open({
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/accounts/view/modal-remove.html',
                            controller: function () {
                            },
                            bindToController: true,
                            controllerAs: 'modalVm',
                            size: 'md'

                        });

                        modal.result
                            .then(function () {
                                return accountsDataFactory.removeAccount({id: data.id}).$promise;
                            })
                            .then(function () {
                                return reloadAccounts();
                            })
                            .then(function () {
                                $location.url('/accounts');
                            })

                    })

                }
            ]);
})();