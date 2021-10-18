import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'todos.updateText'({ todoId, newText }) {
    new SimpleSchema({
      todoId: { type: String },
      newText: { type: String }
    }).validate({ todoId, newText });

    console.log(newText);

  }
});
