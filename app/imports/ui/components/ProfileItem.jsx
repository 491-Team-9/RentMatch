import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List User table. See pages/ListUser.jsx. */
class ProfileItem extends React.Component {
  render() {
    console.log(this.props);
    if (!this.props.user) return;
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
          <Card.Meta>{this.props.user.email}</Card.Meta>
          <Card.Meta><Icon name="users"/> {this.props.user.renters} <Icon name="paw"/> {this.props.user.renters}</Card.Meta>
          <Card.Description>{this.props.user.biography}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/edit-profile/${this.props.user._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileItem.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    renters: PropTypes.number,
    pets: PropTypes.number,
    email: PropTypes.string,
    biography: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileItem);
