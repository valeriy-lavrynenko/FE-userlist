(function () {
    'use strict';

    angular.module('myApp.core')
        .constant('myApp.core.config.accountsData', [
            {
                name: 'John Smith',
                login: 'j.smith',
                age: 20,
                gender: 'male',
                phoneNumber: '123456',
                email: 'j.smith@example.com'
            }, {
                name: 'Bill Gates',
                login: 'b.gates',
                age: 60,
                gender: 'male',
                phoneNumber: '+(012)123-456-543',
                email: 'b.gates@example.com'
            }, {
                name: 'Steve Jobs',
                login: 's.jobs',
                age: 55,
                gender: 'male',
                phoneNumber: '123-432-123',
                email: 's.jobs@example.com'
            }
        ]);
})();