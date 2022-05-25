import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    waiting: false,
    user: '',
    name: '',
    email: '',
    description: '',
    image: '',
    disabled: true,
    waitingSaved: false,
  };

  componentDidMount() {
    this.loadingHeader();
  }

  loadingHeader = async () => {
    this.setState({ waiting: true });
    const userName = await getUser();
    this.setState({ waiting: false,
      name: userName.name,
      email: userName.email,
      description: userName.description,
      image: userName.image });
  };

  saveButton = () => {
    const { name, description, image, email } = this.state;
    this.setState({ waitingSaved: true });
    const objUser = { name, description, image, email };
    updateUser(objUser);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    const { description, image, email } = this.state;
    if (name && description && image && email) {
      this.setState({ disabled: false });
    }
  };

  render() {
    const {
      user,
      waiting,
      name, description, image, email, disabled, waitingSaved } = this.state;
    if (waitingSaved) {
      return <Loading />;
    }
    return (
      <div data-testid="page-profile">
        <Header />
        {waiting ? <Loading /> : (
          <section id="profile-edit-page">
            <form id="profile-form-edit">
              <div>
                <label id="edit-img" htmlFor="edit-input-image">
                  Foto:&emsp;
                  <input
                    data-testid="edit-input-image"
                    id="edit-input-image"
                    type="text"
                    name="image"
                    placeholder={ user.image }
                    onChange={ this.handleChange }
                    value={ image }
                  />
                  <img
                    alt={ `foto de perfil ${name}` }
                    src={ image }
                  />
                </label>
              </div>
              <label htmlFor="edit-input-name">
                Nome:&emsp;
                <input
                  data-testid="edit-input-name"
                  id="edit-input-name"
                  type="text"
                  name="name"
                  placeholder={ user.name }
                  onChange={ this.handleChange }
                  value={ name }
                />
              </label>
              <label htmlFor="edit-input-email">
                Email:&emsp;
                <input
                  data-testid="edit-input-email"
                  id="edit-input-email"
                  type="email"
                  name="email"
                  placeholder={ user.email }
                  onChange={ this.handleChange }
                  value={ email }

                />
              </label>
              <label htmlFor="edit-input-description">
                Descrição:&emsp;
                <textarea
                  data-testid="edit-input-description"
                  id="edit-input-email"
                  type="textarea"
                  name="description"
                  placeholder={ user.description }
                  onChange={ this.handleChange }
                  value={ description }

                />
              </label>
              <Link to="/profile">
                <button
                  data-testid="edit-button-save"
                  id="edit-button-save"
                  name="saveBtn"
                  type="button"
                  onClick={ this.saveButton }
                  disabled={ disabled }
                >
                  Salvar
                </button>
              </Link>
            </form>
          </section>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
