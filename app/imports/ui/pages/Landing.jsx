import React from 'react';
import { Button, Header, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
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
    const rental = this.props.rentals[0];
    console.log('renderPage()', this.props.rentals);
    if (!rental) {
      return (
        <Grid centered id='landing-page' verticalAlign='middle' container>
          No rentals :(
        </Grid>
      );
    }
    return (
      <Grid id='landing' textAlign='center'>
        <Grid.Column>
          <Header as="h1">
            RentMatch
          </Header>
          <Header as="h2">
              Helping people find home
            <br/><br/><Button href='#/home' color="blue">Continue</Button>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
