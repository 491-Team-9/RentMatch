import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Rentals } from '../../api/rental/Rental';
import RentalCard from '../components/RentalCard';

/*
 This page loads a list of rentals and generates RentalCard components
*/
class Home extends React.Component {
  constructor(props) {
    super(props);
    // console.log('landing constructor', props);
    this.getNextCard = this.getNextCard.bind(this);
    // initalize state to view first rental in list
    this.state = {
      currentRentalIndex: 0,
    };
  }

  render() {
    // console.log('render state', this.state);
    if (this.props.ready) {
      return this.renderPage();
    }

    return (<Loader active>Getting data</Loader>);

  }

  /*  componentDidMount() {
    const success = (foo) => {
      console.log(foo);
    };
    const error = (foo) => {
      console.log(foo);
    };
    navigator.geolocation.getCurrentPosition(success, error, {});
  } */

  renderPage() {
    // console.log('renderPage()');
    const rental = this.props.rentals[this.state.currentRentalIndex];
    if (!rental) {
      return (
        <Header id="signout-page" as="h2" textAlign="center">
            No new posts
        </Header>
      );
    }
    return (
      <Grid centered id='landing-page' verticalAlign='middle' container>
        <Grid.Column width={6}>
          <RentalCard key={rental._id} rental={rental} viewType="landing" nextCardFunction={this.getNextCard}/>
        </Grid.Column>
      </Grid>
    );
  }

  getNextCard() {
    /*    // console.log('getting next card, state is', this.state);
    this.setState((state, props) => {
      state.currentRentalIndex += 1;
    }); */
    this.forceUpdate();
  }
}

Home.propTypes = {
  rentals: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Rentals.userPublicationName);
  let rentals = [];
  const user = Meteor.user();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // TODO some kind of pagination ex: fetch 100, then next 100 etc
  if (ready && user) {
    rentals = Rentals.collection.find({ 'likes.likerId': { $ne: user._id }, 'dislikes.dislikerId': { $ne: user._id } }).fetch();
  }
  return {
    rentals,
    ready,
  };

})(Home);
