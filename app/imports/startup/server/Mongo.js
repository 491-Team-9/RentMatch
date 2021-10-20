import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Rentals } from '../../api/rental/Rental';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the database with a default data document.
function addRentalData(data) {
  console.log(`  Adding: ${data.title}`);
  Rentals.collection.insert(data);
}

// Initialize the RentalsCollection if empty.
if (Rentals.collection.find().count() === 0) {
  if (Meteor.settings.defaultRentals) {
    console.log('Creating default rental data.');
    Meteor.settings.defaultRentals.map(data => addRentalData(data));
  }
}
