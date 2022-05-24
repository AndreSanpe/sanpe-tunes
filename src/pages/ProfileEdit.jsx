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
    this.setState({ waiting: false, user: userName });
  };

  saveButton = () => {
    const { name, description, image, email } = this.state;
    this.setState({ waitingSaved: true });
    const objUser = { name, description, image, email };
    updateUser(objUser);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.saveButton);
    const { description, image, email } = this.state;
    if (name && description && image && email) {
      this.setState({ disabled: false });
    }
  };

  render() {
    const {
      user,
      waiting, name, description, image, email, disabled, waitingSaved } = this.state;
    if (waitingSaved) {
      return <Loading />;
    }
    return (
      <div data-testid="page-profile">
        <Header />
        {waiting ? <Loading /> : (
          <form>
            <label htmlFor="edit-input-name">
              Nome
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
              Email
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
              Descrição
              <input
                data-testid="edit-input-description"
                id="edit-input-email"
                type="textarea"
                name="description"
                placeholder={ user.description }
                onChange={ this.handleChange }
                value={ description }

              />
            </label>
            <label htmlFor="edit-input-image">
              Foto
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
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
