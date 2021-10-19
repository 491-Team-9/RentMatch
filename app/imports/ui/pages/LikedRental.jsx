import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Rentals } from '../../api/rental/Rental';
import RentalCard from '../components/RentalCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class LikedRentals extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    // console.log(this.props.rentals);
    return (
      <Container>
        <Header as="h2" textAlign="center">Liked Rentals</Header>
        <Card.Group itemsPerRow={4}>
          {this.props.rentals.map((rental) => (<RentalCard key={rental._id} viewType="liked" rental={rental} />))}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
LikedRentals.propTypes = {
  rentals: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Rentals.likedPublicationName);
  const user = Meteor.user();
  let rentals = [];
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  if (ready) {
    rentals = Rentals.collection.find({ 'dislikes.dislikerId': { $ne: user._id } }).fetch();
  }
  return {
    rentals,
    ready,
  };
})(LikedRentals);
