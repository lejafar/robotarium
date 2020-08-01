import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
 Meteor.subscribe("hackers");
}

if (Meteor.isServer) {
 Meteor.publish('hackers', function() {
   return Meteor.users.find({}, {fields:{username:1, 'profile.name':1, 'services.google.email':1, 'services.google.picture':1, 'services.google.name':1}})
 })
}


