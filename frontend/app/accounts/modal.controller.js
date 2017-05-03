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
                                    $rootScope.$emit(accountEvents.update, accounts);
                                });
                        },
                        reloadAccount = function (account) {
                            $rootScope.$emit(accountEvents.update, account);
                            return reloadAccounts();
                        };

                    scope.txt = modalConstants;
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
                                };
                                this.txt = modalConstants;
                            },
                            controllerAs: 'modalVm',
                            size: 'md'

                        })
                    };


                    $rootScope.$on(accountEvents.editModal, function (event, data) {
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

                    $rootScope.$on(accountEvents.createModal, function (event, data) {
                        var modal = modalInstance({}, 'create');
                        bsLoadingOverlayService.start({
                            referenceId: 'modal'
                        });

                        modal.result
                            .then(function (account) {
                                return accountsDataFactory.createAccount(account).$promise;
                            })
                            .then(function () {
                                return reloadAccounts();
                            });

                    });

                    $rootScope.$on(accountEvents.deleteModal, function (event, data) {
                        var modal = $uibModal.open({
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/accounts/view/modal-remove.html',
                            controller: function () {
                                this.txt = modalConstants;
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