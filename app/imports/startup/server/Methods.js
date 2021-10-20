import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Rentals } from '../../api/rental/Rental';
import { useParams } from 'react-router';
import { User } from '../../api/user/User';

Meteor.methods({
    'user.getInfo'({ userId }) {
        new SimpleSchema({
            userId: { type: String },
        }).validate({ userId1 });

        return User.collection.findOne({ userId });
    }
});

Meteor.methods({
    'user.updateProfile'(profile) {
        Meteor.users.update({ _id: Meteor.userId() }, { $set: { profile }});
    }
});

Meteor.methods({
    'user.addProfileInfo'(userId) {
        let user = Meteor.users.findOne({ _id: userId });
        console.log(user);
        if (user && !user.profile) {
            let profile = {
                firstname: '',
                lastname: '',
                email: user.emails[0].address,
                pets: 0,
                renters: 0,
                biography: ''
            }
            Meteor.users.update({ _id: userId }, { $set: { profile }});
        }

    }
})

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
