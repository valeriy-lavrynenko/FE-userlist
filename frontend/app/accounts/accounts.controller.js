(function () {
    'use strict';

    angular.module('myApp.accounts')
        .controller('myApp.accounts.controller', ['myApp.accounts.service', 'myApp.accounts.service.data', function (service, data) {
            var scope = this;
            data.refreshAccounts();
            scope.data = data;
        }]);
})();