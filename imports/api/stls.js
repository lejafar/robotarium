import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Stls = new Mongo.Collection('stls');

if (Meteor.isServer) {

    Stls.rawCollection().createIndex({"createdAt": -1});


    // This code only runs on the server
    Meteor.publish('myOwnStls', function stlsPublication(userId) {
        return Stls.find({owner: userId}, {sort: {createdAt: -1}, fields: { content: 0}});
    });

    // This code only runs on the server
    Meteor.publish('allReadystls', function stlsPublication(printed) {
        //return Stls.find({ owner: this.userId });
        const options = {
            sort: {createdAt: -1},
            fields: { content: 0}
            // limit: limit
        };
        if(printed != null && printed != ''){
            if (printed === 'true') return Stls.find({printed: true, readyToPrint: true}, options);
            if (printed === 'false') return Stls.find({printed: {$ne: true}, readyToPrint: true}, options);
        }
        return Stls.find({readyToPrint: true}, options);
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
			readyToPrint: false,
            printed: false
        });
    },
    'stls.resolve'(stlId) {
        check(stlId, String);
        return Stls.findOne(stlId);
    },
    'stls.remove'(stlId) {
        check(stlId, String);
        // if (this.userId != Stls.findOne(stlId).owner) {
        //     throw new Meteor.Error('not-authorized to remove this stl');
        // }
        Stls.remove(stlId);
    },
    'stls.updateContent'(stlId, content) {
        check(stlId, String);
        check(content, String);
        if (this.userId != Stls.findOne(stlId).owner) {
            throw new Meteor.Error('not-authorized to update this stl');
        }
        Stls.update(stlId, { $set: { content: content } });
    },
    'stls.updateReadyToPrint'(stlId, readyToPrint) {
        check(stlId, String);
        check(readyToPrint, Boolean);
        if (this.userId != Stls.findOne(stlId).owner) {
            throw new Meteor.Error('not-authorized to update this stl');
        }
        Stls.update(stlId, { $set: { readyToPrint: readyToPrint } });
    },
    'stls.updatePrinted'(stlId, printed) {
        check(stlId, String);
        check(printed, Boolean);
        Stls.update(stlId, { $set: { printed: printed } });
    }
});
