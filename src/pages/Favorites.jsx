import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
state = {
  musicsList: '',
}

componentDidMount() {
  this.favoriteSongs();
}

componentDidUpdate() {
  this.favoriteSongs();
}

favoriteSongs = async () => {
  const getSongs = await getFavoriteSongs();
  this.setState({ musicsList: getSongs });
}

render() {
  const { musicsList } = this.state;
  return (
    <div data-testid="page-favorites">
      <Header />
      <div id="page-favorites">
        {musicsList && musicsList.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            musicsList={ musicsList }

          />
        ))}
      </div>
    </div>
  );
}
}

Favorites.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Favorites;
