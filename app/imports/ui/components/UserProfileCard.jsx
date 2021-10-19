import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Rentals } from '../../api/rental/Rental';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfileCard extends React.Component {

    constructor(props) {
        console.log("constructing profile");
        super(props);
        this.rejectAction = this.rejectAction.bind(this);
        this.acceptAction = this.acceptAction.bind(this);
    }

    acceptAction() {
        Meteor.call('rentals.approveLiker', {rentalId: this.props.rental._id, likerId: this.props.userProfileId }, 
        (err, res) => {
            if (err) {

            }
            else {

            }
        });
    }

    rejectAction() {

    }

    render() {
        console.log(this.props);
        let user = this.props.users.find(u => u._id == this.props.userProfileId);
        if (!user) {
            return ("loading...");
        }
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{user.emails[0].address}</Card.Header>
                    <Card.Content>
                    </Card.Content>
                </Card.Content>
                {/* middle section of the card */}
                <Card.Content>
                    <Card.Description>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button color="red" onClick={this.rejectAction}>
                        <Button.Content>
                            <Icon name='close' />
                        </Button.Content>
                    </Button>
                    <Button color="blue" floated="right" onClick={this.acceptAction}>
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
UserProfileCard.propTypes = {
    viewType: PropTypes.string,
    userProfileId: PropTypes.string,
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


export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('allUsers');
  // Determine if the subscription is ready
  // Get the Stuff documents
  const users = Meteor.users.find({}).fetch();
  return {
    users,
  };
})(UserProfileCard);