import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import './rental-card.css';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RentalCard extends React.Component {
  render() {
    return (
        <div className="rental-card">hello</div>
    );
  }
}

// Require a document to be passed to this component.
RentalCard.propTypes = { 
  rental: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    rooms: PropTypes.number,
    bathrooms: PropTypes.number,
    bathrooms: PropTypes.number,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RentalCard);
