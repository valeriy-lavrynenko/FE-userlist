(function () {
    'use strict';

    angular.module('myApp.accounts')
        .service('myApp.accounts.service', ['$http', '$q', 'myApp.core.config', function ($http, $q, config) {
            var options = {
                getAccounts: {

                }
            };

            this.getAccounts = function () {
                return $q(function (resolve, reject) {
                    resolve(
                        $http.get(config.backendAddress + 'Account')
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            console.error(response.data);
                            reject(response.data);
                        })
                    );
                })
            };

            this.getAccount = function (id) {
                return $q(function (resolve, reject) {
                    resolve(
                        $http.get(config.backendAddress + 'Account/'+ id)
                            .then(function (response) {
                                var activities = response.data.activities;
                                activities.sort(function (a, b) {
                                    return Date.parse(a.date) - Date.parse(b.date);
                                });
                                return response.data;
                            }, function (response) {
                                console.error(response.data);
                                reject(response.data);
                            })
                    );
                })
            };

            this.createAccount = function (account) {
                return $q(function (resolve, reject) {
                    resolve(
                        $http.post(config.backendAddress + 'Account', account)
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            console.error(response.data);
                        })
                    );
                })
            };

            this.updateAccount = function (account) {
                return $q(function (resolve, reject) {
                    resolve(
                        $http.put(config.backendAddress + 'Account/' + account.id, account)
                            .then(function (response) {
                                return response.data;
                            }, function (response) {
                                console.error(response.data);
                            })
                    );
                })
            };

            this.removeAccount = function (id) {
                return $q(function (resolve, reject) {
                    resolve(
                        $http.delete(config.backendAddress + 'Account/'+ id)
                            .then(function (response) {
                                return response.data;
                            }, function (response) {
                                console.error(response.data);
                            })
                    );
                })
            }
        }])
        .factory('myApp.accounts.service.data', ['myApp.accounts.service', function (api) {
            return {
                accounts: [],
                account: {},
                refreshAccounts: function () {
                    var data = this;
                    api.getAccounts()
                        .then(function (accounts) {
                            data.accounts = accounts;
                        });
                },
                refreshAccount: function (id) {
                    var data = this;
                    api.getAccount(id)
                        .then(function (account) {
                            data.account = account;
                        });
                }
            }
        }])
        .factory('myApp.accounts.service.accountToLoad', function () {
            return new function () {
                var accounts = [];
                this.load = function (account) {
                    accounts.push(angular.copy(account));
                };
                this.get = function () {
                    return accounts.pop();
                };
                this.isTheareSomethingToEdit = function () {
                    return !!accounts.length;
                }
            };
        })
})();

