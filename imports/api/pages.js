import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Pages = new Mongo.Collection('pages');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('pages', function pagesPublication() {
        return Pages.find({ owner: this.userId });
    });
}

Meteor.methods({
    'pages.insert'(title, content) {
        check(title, String);
        check(content, String);
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Pages.insert({
            title,
			content,
            createdAt: new Date(),
            owner: this.userId,
        });
    },
    'pages.remove'(pageId) {
        check(pageId, String);
        Pages.remove(pageId);
    },
    'pages.updateContent'(pageId, content) {
        check(pageId, String);
        check(content, String);
        Pages.update(pageId, { $set: { content: content } });
    },
});
