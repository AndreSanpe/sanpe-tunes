import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
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
    this.setState({ waiting: false, user: userName });
  };

  render() {
    const { user, waiting } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {waiting ? <Loading /> : (
          <section id="profile-page">
            <div id="profile">
              <div id="img-link-pefil">
                <img
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ user.name }
                // alt={ `Foto do perfil de ${user.name}` }
                />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <h3>{`Nome cadastrado ${user.name}`}</h3>
              <h1>{user.name}</h1>
              <h4>E-mail</h4>
              <p>{user.email}</p>
              <h4>Descrição</h4>
              <p>{user.description}</p>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
