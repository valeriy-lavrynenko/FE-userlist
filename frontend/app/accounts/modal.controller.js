(function () {
    'use strict';

    angular.module('myApp.accounts')
        .controller('myApp.accounts.modal.controller',
            ['myApp.accounts.service', 'myApp.accounts.service.accountToLoad', 'myApp.accounts.service.data', '$location',
                function (service, accountToLoad, data, location) {

                    var scope = this;

                    scope.createAccount = function (account) {
                        return service.createAccount(account)
                            .then(function () {
                                return data.refreshAccounts();
                            })
                    };

                    scope.updateAccount = function (account) {
                        return service.updateAccount(account)
                            .then(function () {
                                return data.refreshAccount(account.id);
                            })
                    };

                    scope.removeCurrentAccount = function () {
                        service.removeAccount(data.account.id)
                            .then(function () {
                                location.url('/accounts')
                            })
                    };

                    scope.resetForm = function (form) {
                        if(form){
                            form.$setPristine();
                            form.$setUntouched();
                        }
                        scope.account = null;
                    };

                    scope.mode = new function () {
                        var mode = 'create';

                        this.isCreate = function () {
                            return mode == 'create';
                        };

                        this.isEdit = function () {
                            return mode == 'edit';
                        }

                        this.setCreate = function () {
                            mode = 'create';
                        };

                        this.setEdit = function () {
                            mode = 'edit';
                        }
                    };

                    scope.loadForm = function () {
                        scope.account = accountToLoad.get();
                    };


                }
            ]);
})();