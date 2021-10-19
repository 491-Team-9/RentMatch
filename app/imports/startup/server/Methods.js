import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Rentals } from '../../api/rental/Rental';
import { useParams } from 'react-router';

Meteor.methods({
    'users.connectUsers'({ userId1, userId2 }) {
        new SimpleSchema({
            userId1: { type: String },
            userId2: { type: String },
        }).validate({ userId1, userId2 });

        let user1 = Meteor.users.findOne(userId1);
        let user2 = Meteor.users.findOne(userId2);

        Meteor.users.update({ _id: userId1 }, { $addToSet: { connections: { userId: userId2, email: user2.emails[0].address } } });
        Meteor.users.update({ _id: userId2 }, { $addToSet: { connections: { userId: userId1, email: user1.emails[0].address } } });

    }
});

Meteor.methods({
    'rentals.approveLiker'({ rentalId, likerId }) {
        new SimpleSchema({
            rentalId: { type: String },
            likerId: { type: String },
        }).validate({ rentalId, likerId });

        Rentals.collection.update(
            {
                $and: [
                    { _id: rentalId },
                    { 'likes.likerId': likerId }

                ]
            },
            {
                $set: {
                    'likes.$.approvedTime': new Date(),
                }
            });
    },
});
