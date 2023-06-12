import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Stls = new Mongo.Collection('stls');

MAX_STLS = 200

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('stls', function stlsPublication(limit, printed) {
        //return Stls.find({ owner: this.userId });
        const options = {
            sort: {createdAt: -1},
            limit: Math.min(limit, MAX_STLS)
        };
        if(printed != null){
            return Stls.find({printed: printed === 'true'}, options);
        }
        return Stls.find({}, options);
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
