import React from 'react';
import { Grid, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Rentals } from '../../api/stuff/Rental';
import RentalCard from '../components/RentalCard';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let rental = this.props.rentals[0];
    if (!rental) {
      return (
        <Grid centered id='landing-page' verticalAlign='middle' container>
          No rentals :( 
        </Grid>
      );
    }
    return (
      <Grid centered id='landing-page' verticalAlign='middle' container>
        <Grid.Column width={6}>
          <RentalCard rental={rental}/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Rentals.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const rentals = Rentals.collection.find({}).fetch();
  return {
    rentals,
    ready,
  };

})(Landing);
