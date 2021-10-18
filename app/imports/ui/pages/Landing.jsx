import React from 'react';
import { Grid, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Rentals } from '../../api/stuff/Rental';
import RentalCard from '../components/RentalCard';

/*
 This page loads a list of rentals and generates RentalCard components
*/
class Landing extends React.Component {
  constructor(props) {
    super(props);
    console.log('landing constructor', props);
    this.getNextCard = this.getNextCard.bind(this);
    //initalize state to view first rental in list
    this.state = {
      currentRentalIndex: 0
    }
  }

  render() {
    console.log('render state', this.state);
    if (this.props.ready) {
      return this.renderPage();
    } 
    else {
      return(<Loader active>Getting data</Loader>);
    }
    
  }

  renderPage() {
    console.log('renderPage()');
    let rental = this.props.rentals[this.state.currentRentalIndex];
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
          <RentalCard key={rental._id} rental={rental} nextCardFunction={this.getNextCard}/>
        </Grid.Column>
      </Grid>
    );
  }

  getNextCard() {
    console.log('getting next card, state is', this.state);
    this.setState((state, props) => {
      state.currentRentalIndex += 1;
    });
    this.forceUpdate();
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe(Rentals.userPublicationName);
  const user = Meteor.user;
  // Determine if the subscription is ready
  const ready = subscription.ready();
  //TODO some kind of pagination ex: fetch 100, then next 100 etc
  const rentals = Rentals.collection.find({ }).fetch();
  return {
    rentals,
    ready,
  };

})(Landing);
