import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import RentalCard from '../components/RentalCard';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    let rental = {
      name: "Amazing apartment in downtown honolulu",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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

export default Landing;
