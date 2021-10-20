import { Meteor } from 'meteor/meteor';
import { Rentals } from '../../api/rental/Rental';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.title} (${data.ownerId})`);
  Rentals.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Rentals.collection.find().count() === 0) {
  if (Meteor.settings.defaultRentals) {
    console.log('Creating default data.');
    Meteor.settings.defaultRentals.map(data => addData(data));
  }
}
