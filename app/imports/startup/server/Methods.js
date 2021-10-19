import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Rentals } from '../../api/rental/Rental';

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
          { 'likes.likerId': likerId },

        ],
      },
      {
        $set: {
          'likes.$.approvedTime': new Date(),
        },
      },
    );

  },
});
