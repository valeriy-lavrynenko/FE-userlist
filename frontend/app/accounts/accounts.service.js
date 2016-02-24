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
            }
        }])
        .factory('myApp.accounts.service.data', function () {
            return {
                accounts: []
            }
        })
})();

