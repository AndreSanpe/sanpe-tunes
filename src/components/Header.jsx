import React from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    waiting: false,
    user: '',
    profile: '',
    search: '',
    favorito: '',
  };

  componentDidMount() {
    this.loadingHeader();
    this.getHistory();
  }

  getHistory = () => {
    const objHistory = createBrowserHistory();
    const { location } = objHistory;
    const { pathname } = location;
    const selectd = 'header-class';
    const unselectd = 'header-without-class';
    if (pathname === '/search') {
      this.setState({
        search: selectd,
        profile: unselectd,
        favorito: unselectd,
      });
    } if (pathname === '/profile') {
      this.setState({
        search: unselectd,
        profile: selectd,
        favorito: unselectd,
      });
    }
    if (pathname === '/favorites') {
      this.setState({
        search: unselectd,
        profile: unselectd,
        favorito: selectd,
      });
    }
  }

  loadingHeader = async () => {
    this.setState({ waiting: true });
    const userName = await getUser();
    this.setState({ waiting: false, user: userName.name });
  };

  render() {
    const { waiting, user, search, profile, favorito } = this.state;
    return (
      <div>
        {!waiting ? (
          <header data-testid="header-component">
            <div id="header-component">
              <h1>
                <strong> SanPe </strong>
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
              <Link
                className={ search }
                to="/search"
                data-testid="link-to-search"
              >
                Search

              </Link>
              <Link
                className={ favorito }
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorito

              </Link>
              <Link
                className={ profile }
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile

              </Link>
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
