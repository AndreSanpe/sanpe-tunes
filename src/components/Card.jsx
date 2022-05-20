import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      collectionName,
      artistName,
      artworkUrl100,
    } = this.props;

    return (
      <div>
        <p>{ collectionName }</p>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h3>{ artistName }</h3>
        <hr />
      </div>
    );
  }
}

Card.propTypes = {
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default Card;
