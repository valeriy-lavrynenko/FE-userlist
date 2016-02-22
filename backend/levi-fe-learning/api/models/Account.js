/**
* Account.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
'use strict';

module.exports = {

attributes: {
    name: {
        type: 'string',
        required: true
    },
    age: {
        type: 'integer',
        required: true
    },
    gender: {
        type: 'string',
        enum: ['male', 'female'],
        required: true
    },
    phoneNumber: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    login: {
        type: 'string',
        required: true
    },
    avatarUrl: {
        type: 'string'
    },
    activities: { collection: 'Activity', via: 'account' }
},

beforeCreate: function (attributes, cb) {
    const githubUsersIds = [1378201, 4720760, 4225765, 8654081];
    const randomGithubUserId = githubUsersIds[Math.floor(Math.random() * githubUsersIds.length)];

    attributes.avatarUrl = `https://avatars.githubusercontent.com/u/${randomGithubUserId}?s=60`;

    cb();
},

afterCreate: function (record, cb) {
    const now = new Date();
    const numberOfPoints = 10;
    const maxActivitiesPerDay = 5;
    const recordsToCreate = [];

    for (let i = 0; i < numberOfPoints; i++) {
        const pointTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        const activitiesAmount = Math.round(Math.random() * maxActivitiesPerDay);

        recordsToCreate.push({ date: pointTime, amountOfActions: activitiesAmount, account: record.id });
    }
    Activity.create(recordsToCreate, cb);
}
};

