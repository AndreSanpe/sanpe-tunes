import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
state = {
  loading: false,
  favoritoArray: [],
}

  handleCheckbox = async ({ target }) => {
    const { musicsList } = this.props;
    // console.log(musicsList);
    const { favoritoArray } = this.state;
    this.setState({ loading: true });
    const musicFilter = musicsList.filter((item) => item.trackName === target.name)[0];
    favoritoArray.push(musicFilter);
    await addSong(musicFilter);
    this.setState({ loading: false });
  }

  checkedBox = (trackId) => {
    const { favoritoArray } = this.state;
    return favoritoArray.some((item) => item.trackId === trackId);
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {loading ? <Loading /> : (
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              id={ `checkbox-music-${trackId}` }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleCheckbox }
              name={ trackName }
              checked={ this.checkedBox(trackId) }
            />
          </label>
        )}

        <hr />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicsList: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
  })).isRequired,
};

export default MusicCard;
