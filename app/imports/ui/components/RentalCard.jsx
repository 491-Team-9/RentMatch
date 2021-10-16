import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import './rental-card.css';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RentalCard extends React.Component {
  render() {
    let data = this.props.rental;
    return (
    <div className="ui card">
        <div className="content">
            <div className="header">
                {data.name}
            </div>
            <div className="meta">{data.bedrooms}br/{data.bathrooms}ba</div>
            <div className="meta">{data.location}</div>
        </div>
        <div className="image">
            <img src="https://about.hawaiilife.com/wp-content/uploads/2018/06/View-from-Penthouse-at-the-Hokua-at-1288-Ala-Moana-e1528127882669.jpg"/>
        </div>
        <div className="content left aligned">
            <span className="right floated">
            <i className="heart outline like icon"></i>
            17 likes
            </span>
            <i className="comment icon"></i>
            3 questions
        </div>
        <div className="content left aligned">
            {data.description}
        </div>
        <div className="extra content">
            <div className="ui large transparent left floated icon button">
                <i className="close red icon"></i>
            </div>
            <div className="ui large transparent right floated icon button">
                <i className="heart blue icon"></i>
            </div>
        </div>
    </div>

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
