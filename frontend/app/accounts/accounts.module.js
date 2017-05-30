(function () {
    'use strict';

    angular.module('accountsModule', [])
        .run(['bsLoadingOverlayService', function(bsLoadingOverlayService) {
            bsLoadingOverlayService.setGlobalConfig({
                templateUrl: 'app/accounts/view/loading-overlay-template.html'
            });
        }]);
})();