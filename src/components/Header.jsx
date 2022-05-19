import React from 'react';
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
            <h1>
              <strong> Trybe</strong>
              tunes
            </h1>
            <h2 data-testid="header-user-name">{`Usuário: ${user}`}</h2>
          </header>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Header;
