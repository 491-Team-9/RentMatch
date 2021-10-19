import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Rentals } from '../../api/rental/Rental';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RentalCard extends React.Component {

    constructor(props) {
        super(props);
        // console.log('constructing card', props);
        this.owner = Meteor.user();
        this.rejectAction = this.rejectAction.bind(this);
        this.likeAction = this.likeAction.bind(this);
    }

    rejectAction() {
        const getNextCard = this.props.nextCardFunction;
        const rental = this.props.rental;
        Rentals.collection.update(rental._id,
            {
                $push: {
                    dislikes: {
                        dislikerId: this.owner._id,
                        dislikedTime: new Date(),
                    }
                }
            },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'disliked', 'success');
                    getNextCard();
                }
            });
    }

    likeAction() {
        const getNextCard = this.props.nextCardFunction;
        const rental = this.props.rental;
        Rentals.collection.update(rental._id,
            {
                $push: {
                    likes: {
                        likerId: this.owner._id,
                        likedTime: new Date(),
                    }
                }
            },
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
        const rental = this.props.rental;
        const viewType = this.props.viewType;
        console.log(this.props);
        let footer;
        if (viewType == "landing") {
            footer = 
                (<Card.Content extra>
                    <Button color="red" onClick={this.rejectAction}>
                        <Button.Content>
                            <Icon name='close' />
                        </Button.Content>
                    </Button>
                    <Button color="blue" floated="right" onClick={this.likeAction}>
                        <Button.Content>
                            <Icon name='heart' />
                        </Button.Content>
                    </Button>
                </Card.Content>);
        }
        else if (viewType == "liked") {
            let likedTime = this.props.rental.likes.find(x => x.likerId == Meteor.user()._id && x.approvedTime );
            if (likedTime) {
                footer= (<Card.Content extra> approved!  </Card.Content>);
            }
            else {
                footer = (<Card.Content extra> awaiting approval...  </Card.Content>);
            }
        }
        else if (viewType == "posted") {
            let likes = this.props.rental.likes;
            if (likes.length) {
                footer =
                (<Card.Content extra>
                    { likes.map(like => like.likerId )}
                </Card.Content>);
            }
            else footer = (<Card.Content extra> hello </Card.Content>);
        }
        return (
            <Card centered fluid>
                <Card.Content>
                    <Card.Header>{rental.title}</Card.Header>
                    <Card.Content>
                        ${rental.price}/mo
                        <br />{rental.type} | {rental.bedrooms} bd | {rental.bathrooms} ba
                        <br />{rental.location}
                    </Card.Content>
                </Card.Content>
                <Image src='https://about.hawaiilife.com/wp-content/uploads/2018/06/View-from-Penthouse-at-the-Hokua-at-1288-Ala-Moana-e1528127882669.jpg' wrapped ui={false} />
                {/* middle section of the card */}
                <Card.Content>
                    <Card.Description>
                        {rental.description}
                    </Card.Description>
                </Card.Content>
                {footer}
                {/* bottom part of the card with buttons */}

            </Card>
        );
    }



}


// Require a document to be passed to this component.
RentalCard.propTypes = {
    viewType: PropTypes.string,
    nextCardFunction: PropTypes.func,
    rental: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        price: PropTypes.number,
        bedrooms: PropTypes.number,
        bathrooms: PropTypes.number,
        type: PropTypes.string,
        images: PropTypes.array,
    }).isRequired,
};

export default RentalCard;
