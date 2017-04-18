(function () {
    'use strict';

    angular.module('accountsModule')
        .controller('accountController',
            ['accountsDataFactory', '$routeParams', '$rootScope', 'dateFilter', 'accountEvents', 'modalConstants',
                function (accountsDataFactory, $routeParams, $rootScope, dateFilter, accountEvents, modalConstants) {
                    var scope = this;

                    scope.txt = modalConstants;
                    scope.editAccount = function () {
                        $rootScope.$emit(accountEvents.editModal, angular.copy(scope.account));
                    };

                    scope.removeAccount = function () {
                        $rootScope.$emit(accountEvents.deleteModal, angular.copy(scope.account));
                    };

                    $rootScope.$on(accountEvents.update, function (event, data) {
                        scope.account = data;
                        if(scope.account.activities){
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
                        }
                    });

                    accountsDataFactory.getAccount({id: $routeParams.accountId}).$promise
                        .then(function (account) {
                            $rootScope.$emit(accountEvents.update, account);
                        });
                }]);
})();