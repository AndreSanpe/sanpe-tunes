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
    const { musicsList } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    // const musicId = Object.values(params);
    const musics = await getMusics(id);
    this.setState({ musicsList: musics });
    console.log(musicsList);
  };

  render() {
    const { musicsList } = this.state;
    // console.log(musicsList && musicsList[1].artistId);
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <div>
          {musicsList && (
            <div>
              <h3 data-testid="album-name">{musicsList[0].collectionName}</h3>
              <h3 data-testid="artist-name">{musicsList[0].artistName}</h3>
            </div>
          )}

          {musicsList && musicsList.filter((item) => item.trackId).map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
          {/* {musicsList && <MusicCard
            trackName={ musicsList[1].trackName }
            previewUrl={ musicsList[1].previewUrl }
          />} */}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }).isRequired,
};

export default Album;
