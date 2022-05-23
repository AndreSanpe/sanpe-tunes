import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    musicsList: '',
  }

  componentDidMount() {
    this.requestMusics();
  }

  requestMusics = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    this.setState({ musicsList: musics });
  };

  render() {
    const { musicsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 id="album-title">Album</h1>
        <div id="page-album">
          <div>
            {musicsList && (
              <div id="album">
                <h3 data-testid="album-name">{musicsList[0].collectionName}</h3>
                <img
                  src={ musicsList[0].artworkUrl100 }
                  alt={ musicsList[0].artistName }
                />
                <h3 data-testid="artist-name">{musicsList[0].artistName}</h3>
              </div>
            )}
          </div>
          <div id="musics-card">
            {musicsList && musicsList.filter((item) => item.trackId).map((music) => (
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
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
