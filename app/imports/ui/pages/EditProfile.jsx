import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Users } from '../../api/user/User';

const bridge = new SimpleSchema2Bridge(Users.schema);

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, pets, renters, biography, email } = data;
    const userId = Meteor.user()._id;
    let val = Meteor.call('user.updateProfile', { firstName, lastName, email, pets, renters, biography });
    swal('Success', 'Profile updated successfully', 'success');
    // Users.collection.update(_id, { $set: { firstName, lastName, email, biography } }, (error) => (error ?
    //   swal('Error', error.message, 'error') :
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit User</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc.profile}>
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

// Require the presence of a User document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to User documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  // Get the document
  const doc = Meteor.user();
  const ready = doc != null;
  return {
    doc,
    ready,
  };
})(EditProfile);
