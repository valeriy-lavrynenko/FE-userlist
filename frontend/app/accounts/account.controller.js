(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('accountController',
            ['accountsDataFactory', '$routeParams', '$rootScope', 'dateFilter',
                function (accountsDataFactory, $routeParams, $rootScope, dateFilter) {
                    var scope = this;

                    scope.editAccount = function () {
                        $rootScope.$emit('account:edit', angular.copy(scope.account));
                    };

                    scope.removeAccount = function () {
                        $rootScope.$emit('account:delete', angular.copy(scope.account));
                    };

                    $rootScope.$on('account:update', function (event, data) {
                        scope.account = data;
                        scope.account.chart = {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Activities'
                            },
                            xAxis: {
                                categories: scope.account.activities.map(function (activity) {
                                    return dateFilter(Date.parse(activity.date), 'dd/MM/yyyy');
                                })
                            },

                            series: [{
                                name: 'Actions',
                                data: scope.account.activities.map(function (activity) {
                                    return activity.amountOfActions;
                                })
                            }]
                        }
                    });

                    accountsDataFactory.getAccount({id: $routeParams.accountId}).$promise
                        .then(function (account) {
                            $rootScope.$emit('account:update', account);
                        });
                }]);
})();