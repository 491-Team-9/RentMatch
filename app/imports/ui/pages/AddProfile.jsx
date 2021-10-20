import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Users } from '../../api/user/User';
import { number } from 'prop-types';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  pets: Number,
  renters: Number,
  email: String,
  biography: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddProfile extends React.Component {

  // On submit, insert the data.
  submit(data) {
    const { firstName, lastName, pets, renters, biography, email } = data;
    const userId = Meteor.user()._id;
    Meteor.call('user.updateProfile', { firstName, lastName, email, pets, renters, biography });
    // Users.collection.insert({ firstName, lastName, email, pets, renters, biography, owner },
    //   (error) => {
    //     if (error) {
    //       swal('Error', error.message, 'error');
    //     } else {
    //       swal('Success', 'Item added successfully', 'success');
    //     }
    //   });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <TextField name='email'/>
              <NumField name='renters' decimal={false}/>
              <NumField name='pets' decimal={false}/>
              <LongTextField name='biography'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddProfile;
