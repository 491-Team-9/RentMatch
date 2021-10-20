import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Rentals } from '../../api/rental/Rental';
import RentalCard from '../components/RentalCard';

/*
 This page loads a list of rentals and generates RentalCard components
*/
class Landing extends React.Component {
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

  componentDidMount() {
    let success = (foo) => {
      console.log(foo);
    }
    let error = (foo) => {
      console.log(foo);
    }
    navigator.geolocation.getCurrentPosition(success, error, {});
  }

  renderPage() {
    // console.log('renderPage()');
    const priceOptions = [
      { key: 'af', value: 'af', text: 'Afghanistan' }
      ]

    const locationOptions = [
      { key: 'aiea', value: 'aiea', text: 'Aiea' },
      { key: 'ewaBeach', value: 'ewaBeach', text: 'Ewa Beach' },
      { key: 'haleiwa', value: 'haleiwa', text: 'Haleiwa' },
      { key: 'hauula', value: 'hauula', text: 'Hauula' },
      { key: 'hawaiiKai', value: 'hawaiiKai', text: 'Hawaii Kai' },
      { key: 'honolulu', value: 'honolulu', text: 'Honolulu' },
      { key: 'kaaawa', value: 'kaaawa', text: 'Kaaawa' },
      { key: 'kahala', value: 'kahala', text: 'Kahala' },
      { key: 'kahuku', value: 'kahuku', text: 'Kahuku' },
      { key: 'kailua', value: 'kailua', text: 'Kailua' },
      { key: 'kaneohe', value: 'kaneohe', text: 'Kaneohe' },
      { key: 'kapolei', value: 'kapolei', text: 'Kapolei' },
      { key: 'laie', value: 'laie', text: 'Laie' },
      { key: 'lanikai', value: 'lanikai', text: 'Lanikai' },
      { key: 'maili', value: 'maili', text: 'Maili' },
      { key: 'makaha', value: 'makaha', text: 'makaha' },
      { key: 'manoa', value: 'manoa', text: 'Manoa' },
      { key: 'mililani', value: 'mililani', text: 'Mililani' },
      { key: 'nanakuli', value: 'nanakuli', text: 'Nanakuli' },
      { key: 'pearlCity', value: 'pearlCity', text: 'Pearl City' },
      { key: 'wahiawa', value: 'wahiawa', text: 'Wahiawa' },
      { key: 'waialua', value: 'waialua', text: 'Waialua' },
      { key: 'waianae', value: 'waianae', text: 'Waianae' },
      { key: 'waikiki', value: 'waikiki', text: 'Waikiki' },
      { key: 'waimanalo', value: 'waimanalo', text: 'Waimanalo' },
      { key: 'waipahu', value: 'waipahu', text: 'Waipahu' },
    ]

    const typeOptions = [
      { key: 'house', value: 'house', text: 'House' },
      { key: 'apartment', value: 'apartment', text: 'Apartment' },
      { key: 'studio', value: 'studio', text: 'Studio' },
      { key: 'condo', value: 'condo', text: 'Condo' },
      { key: 'room', value: 'room', text: 'Room' },
      { key: 'loft', value: 'loft', text: 'Loft' },
      { key: 'cottage', value: 'cottage', text: 'Cottage' },
      { key: 'in-law', value: 'in-law', text: 'In-Law' },
    ]
    const rental = this.props.rentals[this.state.currentRentalIndex];
    if (!rental) {
      return (
        <Grid centered id='landing-page' verticalAlign='middle' container>
          No rentals :(
        </Grid>
      );
    }
    return (
      <Container>
        <Form>
          <Form.Group widths='equal'>
            <Form.Select label='Price' placeholder='Price Range' options={priceOptions} />
            <Form.Select
              label='Location'
              placeholder='Search Town/City'
              fluid
              search
              selection
              options={locationOptions}
            />
            <Form.Field label='Bedrooms' placeholder='Number of Bedrooms' control='input' type='number'/>
            <Form.Select label='Type' placeholder='Type of Home' options={typeOptions} />
            <Button type='submit'>Submit</Button>
          </Form.Group>
        </Form>
        <Grid centered id='landing-page' verticalAlign='middle' container>
          <Grid.Column width={6}>
            <RentalCard key={rental._id} rental={rental} viewType="landing" nextCardFunction={this.getNextCard}/>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

  getNextCard() {
    // console.log('getting next card, state is', this.state);
    this.setState((state, props) => {
      state.currentRentalIndex += 1;
    });
    this.forceUpdate();
  }
}

Landing.propTypes = {
  rentals: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Rentals.userPublicationName);
  let rentals = [];
  let user = Meteor.user();
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

})(Landing);
