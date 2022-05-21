import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
state = {
  favoritList: '',
}

async componentDidMount() {
  const getSongs = await getFavoriteSongs();
  this.setState({ favoritList: getSongs });
}

render() {
  return (
    <div data-testid="page-favorites">
      <Header />
      <h1>Fovoritos</h1>
    </div>
  );
}
}

export default Favorites;
