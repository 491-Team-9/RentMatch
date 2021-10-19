import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Rentals } from '../../api/rental/Rental';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Rentals.userPublicationName, function () {
  if (this.userId) {
    return Rentals.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Rentals.postedRentalsPublicationName, function () {
  if (this.userId) {
    return Rentals.collection.find({ 'ownerId': this.userId });
  }
  return this.ready();
});

Meteor.publish(Rentals.likedPublicationName, function () {
  if (this.userId) {
    return Rentals.collection.find({ 'likes.likerId': this.userId });
  }
  return this.ready();
});

Meteor.publish('allUsers', function() {
  return Meteor.users.find({}, { fields: { _id: 1, username: 1, emails: 1 } } );
})

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Rentals.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Rentals.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
