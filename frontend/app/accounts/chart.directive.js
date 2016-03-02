(function () {
    'use strict';

    angular.module('myApp.accounts')
        .directive('hcPieChart', ['dateFilter', function (dateFilter) {
            return {
                restrict: 'E',
                template: '<div></div>',
                scope: {
                    title: '@',
                    data: '='
                },
                link: function (scope, element) {
                    scope.$watch(function () {
                        return scope.data.account || false
                    }, function (account)
                    {
                        if(!account || !account.activities) return;
                        Highcharts.chart(element[0], {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: scope.title
                            },
                            xAxis: {
                                categories: account.activities.map(function (activity) {
                                    return dateFilter(Date.parse(activity.date), 'dd/MM/yyyy');
                                })
                            },

                            series: [{
                                name: 'Actions',
                                data: account.activities.map(function (activity) {
                                    return activity.amountOfActions;
                                })
                            }]
                        });

                    })
                }
            };
        }]);

})();