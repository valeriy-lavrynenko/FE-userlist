(function () {
    'use strict';

    angular.module('accountsModule')
        .directive('hcPieChart', ['dateFilter', '$window', function (dateFilter, $window) {
            return {
                restrict: 'E',
                template: '<div></div>',
                scope: {
                    title: '@',
                    data: '='
                },
                link: function (scope, element) {
                    scope.$watch(function () {
                        return scope.data || false
                    }, function (account)
                    {
                        if(!account || !account.activities) return;
                        var chart = Highcharts.chart(element[0], {
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

                        angular.element($window).on('resize', function () {
                            chart.reflow();
                        });
                    })
                }
            };
        }]);

})();