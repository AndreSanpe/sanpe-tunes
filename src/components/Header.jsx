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
            <div>
              <h1>
                <strong> Trybe</strong>
                tunes
              </h1>
              <h2 data-testid="header-user-name">{`Usuário: ${user}`}</h2>
            </div>
            <div>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Search</Link>
              <Link to="/profile" data-testid="link-to-profile">Search</Link>
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
