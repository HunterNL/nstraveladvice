import { Meteor } from 'meteor/meteor';
import { getTravelAdvise } from '/imports/ns.js';
import './stations_download';

Meteor.startup(() => {
  if (!Meteor.settings.NS_API_NAME) {
    throw new Meteor.Error('api_name_missing', 'Missing NS API name');
  }
  
  if (!Meteor.settings.NS_API_PASSWORD) {
    throw new Meteor.Error('api_password_missing', 'Missing NS API password');
  }
});

const methods = {
  getTravelAdvise,
};

Meteor.methods(methods);
