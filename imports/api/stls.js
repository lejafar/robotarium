import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Stls = new Mongo.Collection('stls');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('stls', function stlsPublication() {
        //return Stls.find({ owner: this.userId });
        return Stls.find({});
    });
}

Meteor.methods({
    'stls.insert'(filename, content) {
        check(filename, String);
        check(content, String);
        // Make sure the user is logged in before inserting a task
        if (content.length > 15000000) {
            throw new Meteor.Error(`file is too large ${content.length}`);
        }
        if (!filename.endsWith('.stl')) {
            throw new Meteor.Error('file is not an .stl file');
        }
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Stls.insert({
            filename,
			content,
            createdAt: new Date(),
            owner: this.userId,
        });
    },
    'stls.remove'(stlId) {
        check(stlId, String);
        if (this.userId != Stls.findOne(stlId).owner) {
            throw new Meteor.Error('not-authorized to remove this part');
        }
        Stls.remove(stlId);
    },
    'stls.updateContent'(stlId, content) {
        check(stlId, String);
        check(content, String);
        Stls.update(stlId, { $set: { content: content } });
    }
});
