//TODO: Move to service
(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('modalController',
            ['accountsDataFactory', '$location', '$rootScope', '$uibModal', 'accountEvents', 'modalConstants', 'bsLoadingOverlayService',
                function (accountsDataFactory, $location, $rootScope, $uibModal, accountEvents, modalConstants, bsLoadingOverlayService) {

                    var scope = this,
                        reloadAccounts = function () {
                            return accountsDataFactory.getAccounts().$promise
                                .then(function (accounts) {
                                    $rootScope.$emit(accountEvents.updateAll, accounts);
                                });
                        },
                        reloadAccount = function (account) {
                            $rootScope.$emit(accountEvents.update, account);
                            return reloadAccounts();
                        };

                    scope.txt = modalConstants;

                    var modalInstance = function (account, mode, onSent) {
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
                                };
                                this.submit = function (data) {
                                    var vm = this;
                                    bsLoadingOverlayService.start({referenceId: 'modal'});
                                    return onSent(data)
                                        .then(function () {
                                            vm.$close();
                                        })
                                        .finally(function () {
                                            bsLoadingOverlayService.stop({referenceId: 'modal'});
                                        })
                                };
                                this.txt = modalConstants;
                            },
                            controllerAs: 'modalVm',
                            size: 'md'

                        })
                    };

                    $rootScope.$on(accountEvents.editModal, function (event, data) {
                        var onSubmit = function (account) {
                            return accountsDataFactory.updateAccount({id: account.id}, account).$promise
                                .then(function () {
                                    return reloadAccount(account);
                                });
                        };
                        modalInstance(data, 'edit', onSubmit);
                    });

                    $rootScope.$on(accountEvents.createModal, function (event, data) {
                        var onSubmit = function (account) {
                            return accountsDataFactory.createAccount(account).$promise
                                .then(function () {
                                    return reloadAccounts();
                                });
                        };
                        modalInstance({}, 'create', onSubmit);

                    });

                    $rootScope.$on(accountEvents.deleteModal, function (event, data) {
                        var modal = $uibModal.open({
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/accounts/view/modal-remove.html',
                            controller: function () {
                                this.txt = modalConstants;
                                this.submit = function () {
                                    var vm = this;
                                    bsLoadingOverlayService.start({referenceId: 'modalDelete'});
                                    return onSubmit()
                                        .then(function () {
                                            vm.$close();
                                        })
                                        .finally(function () {
                                            bsLoadingOverlayService.stop({referenceId: 'modalDelete'});
                                        })
                                }
                            },
                            bindToController: true,
                            controllerAs: 'modalVm',
                            size: 'md'
                        });

                        function onSubmit () {
                            return accountsDataFactory.removeAccount({id: data.id}).$promise
                                .then(function () {
                                    return reloadAccounts();
                                })
                                .then(function () {
                                    $location.url('/accounts');
                                })
                        };
                    })

                }
            ]);
})();