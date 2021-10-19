import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Rentals } from '../../api/rental/Rental';
import RentalCard from '../components/RentalCard';
import UserProfileCard from '../components/UserProfileCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class PostedRentals extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? ((this.props.rentals.length) ? this.renderPage() : "no rentals" ) : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    console.log(this.props.rentals)
    return (
      <Container>
        <Header as="h2" textAlign="center">Your Rentals</Header>
            <Grid>
              {
                this.props.rentals.map((rental) => {
                  return (
                    <Grid.Row>
                      <Grid.Column width="4">
                        <RentalCard key={rental._id} viewType="posted" rental={rental}/>
                      </Grid.Column>
                      <Card.Group>
                    {
                      rental.likes.map((like) => {
                        return (<UserProfileCard key={like.likerId} userProfileId={like.likerId}/>)
                      })
                    }
                    </Card.Group>
                    </Grid.Row>
                  )
                })
              }
            </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
PostedRentals.propTypes = {
  rentals: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Rentals.postedRentalsPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const rentals = Rentals.collection.find({}).fetch();
  return {
    rentals,
    ready,
  };
})(PostedRentals);
