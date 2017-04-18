(function () {
    'use strict';

    angular.module('accountsModule')
        .constant('accountEvents', {
            update: 'account:update',
            deleteModal: 'account.modal:delete',
            createModal: 'account.modal:create',
            editModal: 'account.modal:edit',
        })
})();