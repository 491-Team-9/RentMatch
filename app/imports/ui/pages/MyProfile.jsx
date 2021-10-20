import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import ProfileItem from '../components/ProfileItem';

/** Renders a table containing all of the User documents. Use <UserItem> to render each row. */
class MyProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">My Profile</Header>
        <Card centered>
          {this.props.users.map((user) => <ProfileItem key={user._id} user={user} />)}
        </Card>
      </Container>
    );
  }
}

// Require an array of User documents in the props.
MyProfile.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to User documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the User documents
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(MyProfile);
