import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    loading: false,
    disabled: true,
    name: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const MAX_LENGTH = 3;
    this.setState({
      name: value,
    });
    if (value.length >= MAX_LENGTH) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  btnLogin = () => {
    const { name } = this.state;
    const userName = { name };
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      await createUser(userName);
      this.setState({ loading: false });
      history.push('/search');
    });
  };

  render() {
    const { disabled, name, loading } = this.state;
    return (
      <div className="page-main-login">
        { !loading
          ? (
            <div data-testid="page-login" className="page-login">
              <h1>Login</h1>
              {' '}
              <i className="fa-regular fa-circle-play" />
              {' '}
              <form className="form-login">
                <label htmlFor="login">
                  Nome:&emsp;
                  <input
                    type="text"
                    id="login"
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>
                <button
                  type="button"
                  className="btn-Login"
                  data-testid="login-submit-button"
                  disabled={ disabled }
                  onClick={ this.btnLogin }
                >
                  Entrar

                </button>
              </form>

            </div>)
          : (<Loading />)}
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
