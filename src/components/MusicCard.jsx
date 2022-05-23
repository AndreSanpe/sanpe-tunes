import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
state = {
  loading: false,
  checkedBox: false,
}

async componentDidMount() {
  const getSongs = await getFavoriteSongs();
  this.setState({ checkedBox: this.checkedBox(getSongs) });
}

  handleCheckbox = async ({ target }) => {
    this.setState({ loading: true });
    const { musicsList } = this.props;
    const { checked } = target;
    const musicFilter = musicsList.filter((item) => item.trackName === target.name)[0];
    if (checked) {
      await addSong(musicFilter);
      this.setState({ loading: false, checkedBox: checked });
      return;
    }
    await removeSong(musicFilter);
    this.setState({ loading: false, checkedBox: checked });
  }

  // I'm using list to validate the list of objects;
  checkedBox = (list) => {
    const { trackId } = this.props;
    return list.some((item) => item.trackId === trackId);
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const { loading, checkedBox } = this.state;
    return (
      <div id="musicCard">

        {loading ? <Loading /> : (
          <label htmlFor={ `checkbox-music-${trackId}` } id="label-favorite">
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <div id="favate-input">
              Favorita&emsp;
              <input
                id={ `checkbox-music-${trackId}` }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleCheckbox }
                name={ trackName }
                checked={ checkedBox }
              />
            </div>
          </label>
        )}
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

// MusicCard.propTypes = {
//   trackName: PropTypes.string.isRequired,
//   previewUrl: PropTypes.string.isRequired,
//   trackId: PropTypes.number.isRequired,
//   musicaCompleta: PropTypes.shape({}).isRequired,
//   atualizarLista: PropTypes.func,
// };
// MusicCard.defaultProps = {
//   atualizarLista: () => {},
// };
