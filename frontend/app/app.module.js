(function () {
    'use strict';

    angular.module('myApp', [
        'accountsModule',
        'coreModule',
        'ngResource',
        'ngRoute',
        'ngTouch',
        'ngAnimate',
        'ui.bootstrap',
        'highcharts-ng',
        'bsLoadingOverlay',
        'picardy.fontawesome'
    ]).run(['bsLoadingOverlayService', function(bsLoadingOverlayService) {
        bsLoadingOverlayService.setGlobalConfig({
            templateUrl: 'app/accounts/view/loading-overlay-template.html'
        });
    }]);

})();