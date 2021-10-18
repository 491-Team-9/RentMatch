import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Rentals } from '../../api/stuff/Rental';
import './rental-card.css';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RentalCard extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructing card", props);
        this.owner = Meteor.user();
    }

    rejectAction(rental) {
        let getNextCard = this.props.nextCard;
        Rentals.collection.update(rental._id,
            { $push: { 'dislikes': {  
                dislikerId: this.owner._id,
                dislikedTime: new Date(),
            }}},
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'disliked', 'success');
                    getNextCard();
                }
            });
    }

    likeAction(rental) {
        let getNextCard = this.props.nextCard;
        Rentals.collection.update(rental._id,
            { $push: { 'likes': {  
                likerId: this.owner._id,
                likedTime: new Date(),
            }}},
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Liked', 'success');
                    getNextCard();
                }
            });
    }

    render() {
        let rental = this.props.rental;
        return (
            <Card centered fluid>
                <Card.Content>
                    <Card.Header>{rental.name}</Card.Header>
                    <Card.Meta>
                        {rental.bedrooms} br
                    </Card.Meta>
                </Card.Content>
                <Image src='https://about.hawaiilife.com/wp-content/uploads/2018/06/View-from-Penthouse-at-the-Hokua-at-1288-Ala-Moana-e1528127882669.jpg' wrapped ui={false} />

                <Card.Content>
                    <Card.Description>
                        {rental.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button color="red" onClick={e => this.rejectAction(rental)}>
                        <Button.Content>
                            <Icon name='close' />
                        </Button.Content>
                    </Button>
                    <Button color="blue" floated="right" onClick={e => this.likeAction(rental)}>
                        <Button.Content>
                            <Icon name='heart' />
                        </Button.Content>
                    </Button>

                </Card.Content>
            </Card>
        );
    }

}

// Require a document to be passed to this component.
RentalCard.propTypes = {
    nextCard: PropTypes.func,
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
