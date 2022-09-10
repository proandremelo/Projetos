import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import logo from '../images/Tunes.png';
import '../style/Login.css';

const MIN_SIZE_INPUT = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      buttonDisabled: true,
      carregando: false,
    };
  }

  handleChangeInputLogin = ({ target }) => {
    if (target.value.length >= MIN_SIZE_INPUT) {
      this.setState({ userName: target.value, buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  handleClickFormBtn = async () => {
    const { userName } = this.state;
    const { logar } = this.props;
    this.setState({ carregando: true });
    await createUser({ name: userName });
    this.setState({ carregando: false });
    logar();
  };

  render() {
    const { buttonDisabled, carregando } = this.state;
    return (
      <div className="main-login" data-testid="page-login">
        {
          carregando
            ? <Carregando />
            : (
              <div className="content-login">
                <img className="logo-login" src={ logo } alt="logo-trybetunes" />
                <form className="form-login" onSubmit={ this.handleClickFormBtn }>
                  <input
                    className="input-login"
                    type="text"
                    placeholder="Nome"
                    onChange={ this.handleChangeInputLogin }
                    data-testid="login-name-input"
                  />
                  <button
                    className="btn-login"
                    type="button"
                    onClick={ this.handleClickFormBtn }
                    data-testid="login-submit-button"
                    disabled={ buttonDisabled }
                  >
                    Entrar
                  </button>
                </form>
              </div>)
        }
      </div>
    );
  }
}

Login.propTypes = {
  logar: PropTypes.func.isRequired,
};

export default Login;
