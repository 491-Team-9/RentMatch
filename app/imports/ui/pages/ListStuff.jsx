import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Grid, GridRow, GridColumn } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Rentals } from '../../api/stuff/Rental';
import RentalCard from '../components/RentalCard';
import StuffItem from '../components/StuffItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListLikedRentals extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Liked Rentals</Header>
        <Grid>
        {this.props.rentals.map((rental) => {
          console.log(rental);
          return(
            <GridColumn width="4">
              <RentalCard key={rental._id} rental={rental} />
            </GridColumn>
          );
        })}
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListLikedRentals.propTypes = {
  rentals: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Rentals.likedPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const rentals = Rentals.collection.find({}).fetch();
  return {
    rentals,
    ready,
  };
})(ListLikedRentals);
