import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends React.Component {
state = {
  buttonStatus: true,
  album: '',
  loading: false,
  artist: false,
  artistNameAlbum: '',
  searchAlbum: '',
};

  handleChange=({ target }) => {
    const { value } = target;
    this.setState({ album: value });
    const MAX_LENGTH = 2;
    if (value.length >= MAX_LENGTH) {
      this.setState({ buttonStatus: false });
    } else { this.setState({ buttonStatus: true }); }
  }

  searchArtistBtn = async () => {
    const { album, artistNameAlbum } = this.state;
    this.setState({ artistNameAlbum: album });
    console.log(artistNameAlbum);
    this.setState({ loading: true });
    const search = await searchAlbumsAPIs(album);

    this.setState({ searchAlbum: search, artist: true, album: '', loading: false });
  }

  render() {
    const {
      album, buttonStatus, loading, artist, artistNameAlbum, searchAlbum } = this.state;

    return (
      <div>
        {!loading ? (
          <div data-testid="page-search">
            <Header />
            <form className="search-form">
              <label htmlFor="user-input">
                <input
                  type="text"
                  id="user-input"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                  onChange={ this.handleChange }
                  value={ album }
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ buttonStatus }
                onClick={ this.searchArtistBtn }
                className="btn-search"
              >
                Pesquisar

              </button>
            </form>
          </div>) : <Loading />}
        {artist && (
          <div>
            {(searchAlbum.length === 0) ? <h1>Nenhum álbum foi encontrado</h1> : (
              <h2>
                <br />
                {' '}
                Resultado de álbuns de:
                {' '}
                {artistNameAlbum}
              </h2>) }

            <div id="search-artist">
              {searchAlbum.map((item) => (
                <Link
                  data-testid={ `link-to-album-${item.collectionId}` }
                  to={ `/album/${item.collectionId}` }
                  key={ item.artworkUrl100 }
                >
                  <Card
                    collectionName={ item.collectionName }
                    artistName={ item.artistName }
                    artworkUrl100={ item.artworkUrl100 }
                  />
                </Link>

              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
