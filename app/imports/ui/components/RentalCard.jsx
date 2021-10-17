import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import './rental-card.css';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RentalCard extends React.Component {
  render() {
    let data = this.props.rental;
    return (
        <Card centered fluid>
        <Card.Content>
          <Card.Header>{data.name}</Card.Header>
          <Card.Meta>
              {data.bedrooms} br
          </Card.Meta>
        </Card.Content>
        <Image src='https://about.hawaiilife.com/wp-content/uploads/2018/06/View-from-Penthouse-at-the-Hokua-at-1288-Ala-Moana-e1528127882669.jpg' wrapped ui={false} />

        <Card.Content>
          <Card.Description>
              {data.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button color="red">
                <Button.Content>
                    <Icon name='close'/>
                </Button.Content>
            </Button>
            <Button color="blue" floated="right">
                <Button.Content>
                    <Icon name='heart'/>
                </Button.Content>
            </Button>

        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
RentalCard.propTypes = { 
  rental: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.number,
    rooms: PropTypes.number,
    bathrooms: PropTypes.number,
    images: PropTypes.array,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RentalCard);
