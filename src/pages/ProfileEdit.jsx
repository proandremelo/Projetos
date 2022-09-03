import React from 'react';
import { func } from 'prop-types';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      disableButton: true,
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  async componentDidMount() {
    // this.setState({ loading: true });
    const user = await getUser();
    const { name, email, description, image } = user;
    // this.setState({ user, loading: false });
    this.setState({ name, description, image, email });
    this.validateUser(name, description, image, email);
  }

  validadeEmail = (email) => {
    // const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return regex.test(email);
  };

  validateUser = (name, description, image, email) => {
    const disableButton = !(name && description && image && this.validadeEmail(email));
    this.setState({ disableButton });
  };

  handleClick = () => {
    const { name, description, image, email } = this.state;
    const { editarProfile } = this.props;
    updateUser({
      name,
      email,
      image,
      description,
    });
    editarProfile();
  };

  handleChange = ({ target }) => {
    const { name, description, image, email } = this.state;
    this.setState({ [target.id]: target.value });
    this.validateUser(name, description, image, email);
  };

  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
      disableButton,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {
          loading
            ? <Carregando />
            : (
              <div>
                <Header />
                <form>
                  <label htmlFor="name">
                    Nome
                    <input
                      id="name"
                      type="text"
                      value={ name }
                      data-testid="edit-input-name"
                      onChange={ this.handleChange }
                      placeholder="Nome"
                    />
                  </label>
                  <label htmlFor="email">
                    Email
                    <input
                      id="email"
                      type="text"
                      value={ email }
                      data-testid="edit-input-email"
                      onChange={ this.handleChange }
                      placeholder="Email"
                    />
                  </label>
                  <label htmlFor="description">
                    Descrição
                    <input
                      id="description"
                      type="text"
                      value={ description }
                      data-testid="edit-input-description"
                      onChange={ this.handleChange }
                      placeholder="Descrição"
                    />
                  </label>
                  <label htmlFor="image">
                    Imagem
                    <input
                      id="image"
                      type="text"
                      value={ image }
                      data-testid="edit-input-image"
                      onChange={ this.handleChange }
                      placeholder="URL da Imagem"
                    />
                  </label>
                  <button
                    type="button"
                    data-testid="edit-button-save"
                    disabled={ disableButton }
                    onClick={ this.handleClick }
                  >
                    Salvar
                  </button>
                </form>
              </div>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  editarProfile: func.isRequired,
};

export default ProfileEdit;
