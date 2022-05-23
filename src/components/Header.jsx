import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    waiting: false,
    user: '',
  };

  componentDidMount() {
    this.loadingHeader();
  }

  loadingHeader = async () => {
    this.setState({ waiting: true });
    const userName = await getUser();
    this.setState({ waiting: false, user: userName.name });
  };

  render() {
    const { waiting, user } = this.state;
    return (
      <div>
        {!waiting ? (
          <header data-testid="header-component">
            <div id="header-component">
              <h1>
                <strong> Trybe</strong>
                <br />
                {' '}
                &emsp; tunes
              </h1>
              <div id="log-out">
                <h2 data-testid="header-user-name">{`Olá ${user}!`}</h2>
                <Link to="/" id="header-user">
                  <i className="fa-solid fa-arrow-right-from-bracket" />
                </Link>
              </div>
            </div>
            <div id="header-links">
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorito</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </div>
          </header>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Header;
