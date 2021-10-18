import React from 'react';
import { Grid, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Rentals } from '../../api/stuff/Rental';
import RentalCard from '../components/RentalCard';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    console.log('landing constructor', props);
    this.nextCard = this.nextCard.bind(this);
    this.state = {
      rentalIndex: 0
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.ready && state.isWritable) { console.log("!!! init state !!!", props, state);

  //   }
  //   console.log('derived state', state);
  //   return state;
  // }

  render() {
    console.log('render state', this.state);
    if (this.props.ready) {
      return this.renderPage();
    } 
    else {
      return(<Loader active>Getting data</Loader>);
    }
    
  }

  setUpState() {
    // this.setState((state, props) => {
    //   console.log("setting state", state);
    //   if (state.rentals.length) {
    //     state.rental = state.rentals.pop()
    //   }
    //   else {
    //     state.rental = null;
    //   }
    //   console.log("state is now ", state);
    // });
    // this.render();
  }

  renderPage() {
    console.log('renderPage()');
    let rental = this.props.rentals[this.state.rentalIndex];
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
          <RentalCard key={rental._id} rental={rental} nextCard={this.nextCard}/>
        </Grid.Column>
      </Grid>
    );
  }

  nextCard() {
    console.log('getting next card, state is', this.state);
    this.setState((state, props) => {
      state.rentalIndex += 1;
    });
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
