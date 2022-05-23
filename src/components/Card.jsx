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
      <div id="card">
        <p>{ collectionName }</p>
        <div id="img-card">
          <img src={ artworkUrl100 } alt={ collectionName } />
        </div>
        <h3>{ artistName }</h3>
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
