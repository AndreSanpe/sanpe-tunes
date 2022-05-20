import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
state = {
  buttonStatus: true,
  album: '',
};

  handleChange=({ target }) => {
    const { value } = target;
    this.setState({ album: value });
    console.log(value);
    const MAX_LENGTH = 2;
    if (value.length >= MAX_LENGTH) {
      this.setState({ buttonStatus: false });
    } else { this.setState({ buttonStatus: true }); }
  }

  render() {
    const { album, buttonStatus } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
            onClick={ this.searchBtn }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
