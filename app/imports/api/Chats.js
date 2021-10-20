import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The RentalsCollection. It encapsulates state and variable values for rental.
 */
class ChatsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ChatsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      users: Array,
      'users.$': Object,
      'users.$.userId': String,
      'users.$.email': String,
      messages: Array,
      'messages.$': { type: Object, optional: true},
      'messages.$.userId': { type: String, optional: true},
      'messages.$.time': { type: Date, optional: true},
      'messages.$.message': { type: String, optional: true},
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userChatsPublicationName = `${this.name}.publication.user`;
  }
}

export const Chats = new ChatsCollection();
