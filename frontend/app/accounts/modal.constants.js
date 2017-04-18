(function () {
    'use strict';

    angular.module('accountsModule')
        .constant('modalConstants', {
            title: {
                create: 'Create account',
                edit: 'Edit account',
                delete: 'Are you sure?'
            },
            fields: {
                name: {
                    label: 'Name',
                    validation: 'Name - text field 3..15 characters'
                },
                login: {
                    label: 'Login',
                    validation: 'Login - text field 5..15 characters'
                },
                age: {
                    label: 'Age',
                    validation: 'Age - number field - integer 18..100'
                },
                gender: {
                    label: 'Gender',
                },
                phone: {
                    label: 'Phone',
                    validation: 'PhoneNumber - text field with following mask: +380(##)###-##-## (# - is a digit)'
                },
                email: {
                    label: 'Email address',
                    validation: 'Email - text field with following requirements pattern: A@B.C'
                },
                validations: {
                    required: 'Field is required'
                },
                id: {
                    label: 'Id'
                }
            },
            message: {
                delete: 'Are sure want to delete account?',
            },
            buttons: {
                create: 'Create',
                update: 'Update',
                close: 'Close',
                cancel: 'Cancel',
                ok: 'Ok',
                edit: 'Edit',
                remove: 'Remove',
                add: 'Add'
            },
            panels: {
                activities: 'Activities',
                details: 'Details',
                accounts: 'Accounts'
            }
        })
})();