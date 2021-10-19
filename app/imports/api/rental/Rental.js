import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The RentalsCollection. It encapsulates state and variable values for rental.
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
      location: String,
      price: Number,
      bedrooms: Number,
      bathrooms: Number,
      type: String,
      likes: Array,
      'likes.$': Object,
      'likes.$.likerId': String,
      'likes.$.likedTime': Date,
      'likes.$.approvedTime': {
        type: Date,
        optional: true,
      },
      dislikes: {
        type: Array,
        optional: true,
      },
      'dislikes.$': Object,
      'dislikes.$.dislikerId': String,
      'dislikes.$.dislikedTime': Date,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.likedPublicationName = `${this.name}.publication.liked`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RentalsCollection.
 * @type {RentalsCollection}
 */
export const Rentals = new RentalsCollection();
