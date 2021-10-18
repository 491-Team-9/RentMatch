import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CardStack extends React.Component {
  render() {
    let data = this.props.rental;
  }
}

// Require a document to be passed to this component.
// CardStack.propTypes = { 
// };

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CardStack);
