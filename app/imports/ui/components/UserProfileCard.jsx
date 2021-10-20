import React from 'react';
import { Card, Icon, Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfileCard extends React.Component {

  constructor(props) {
    // console.log('constructing profile');
    super(props);
    this.rejectAction = this.rejectAction.bind(this);
    this.acceptAction = this.acceptAction.bind(this);
  }

  acceptAction() {
    Meteor.call('rentals.approveLiker', { rentalId: this.props.rental._id, likerId: this.props.userProfileId });
    Meteor.call('users.connectUsers', { userId1: this.props.userProfileId, userId2: Meteor.user()._id });
  }

  rejectAction() {

  }

  render() {
    // console.log(this.props);
    const user = this.props.users.find(u => u._id === this.props.userProfileId);
    console.log(user);
    if (!user) {
      return ('loading...');
    }
    if (!user.profile) {
      Meteor.call('user.addProfileInfo', user._id);
    }
    return (
      <Card>
        <Card.Content>
          <Modal trigger={
            <Card.Header>
              {user.profile?.email}
            </Card.Header>
          }>
            <Modal.Content>
              <Card>
                <Card.Content>
                  <Card.Header>{user.profile?.firstName} {user.profile?.lastName}</Card.Header>
                  <Card.Meta>{user.profile?.email}</Card.Meta>
                  <Card.Meta><Icon name="users" /> {user.profile?.renters} <Icon name="paw" /> {user.profile?.pets}</Card.Meta>
                  <Card.Description>{user.profile?.biography}</Card.Description>
                </Card.Content>
              </Card>
            </Modal.Content>
          </Modal>
        </Card.Content>
        {/* middle section of the card */}
        <Card.Content extra>
          <Button color="red" onClick={this.rejectAction}>
            <Button.Content>
              <Icon name='close' />
            </Button.Content>
          </Button>
          <Button color="blue" floated="right" onClick={this.acceptAction}>
            <Button.Content>
              <Icon name='heart' />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
    );
  }

}

// Require a document to be passed to this component.
UserProfileCard.propTypes = {
  viewType: PropTypes.string,
  users: PropTypes.array,
  userProfileId: PropTypes.string,
  rental: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.number,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    type: PropTypes.string,
    images: PropTypes.array,
  }).isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('allUsers');
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const users = Meteor.users.find({}).fetch();
  return {
    ready,
    users,
  };
})(UserProfileCard);
