import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { string } from 'prop-types';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class RentalsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RentalsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
        name: String,
        ownerId: String,
        description: String,
        price: Number,
        bedrooms: Number,
        bathrooms: Number,
        type: String,
        likes: Array,
        'likes.$': Object,
        'likes.$.liker': Object,
        'likes.$.likedTime': Date,
        'likes.$.approvedTime': Date,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}


/**
 * The singleton instance of the StuffsCollection.
 * @type {RentalsCollection}
 */
export const Rentals = new RentalsCollection();
