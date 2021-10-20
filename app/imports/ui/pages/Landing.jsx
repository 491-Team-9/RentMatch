import React from 'react';
import { Button, Header, Grid, Loader } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return this.renderPage();

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
    return (
      <Grid id='landing' textAlign='center'>
        <Grid.Column>
          <Header as="h1">
            RentMatch
          </Header>
          <Header as="h2">
            Helping people find home
            <br /><br /><Button href='#/home' color="blue">Continue</Button>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
