import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  async componentDidMount() {
    // this.setState({ loading: true });
    const user = await getUser();
    // this.setState({ user, loading: false });
    this.setState({ user });
  }

  render() {
    const { user: { name, email, description, image }, loading } = this.state;
    return (
      <div data-testid="page-profile">
        {
          loading
            ? <Carregando />
            : (
              <div>
                <Header />
                <div>
                  <img
                    src={ image }
                    alt="<Imagem do Perfil>"
                    data-testid="profile-image"
                  />
                  <Link to="/profile/edit">Editar perfil</Link>
                </div>
                <h2>Nome</h2>
                <p>{ name }</p>
                <h2>E-mail</h2>
                <p>{ email }</p>
                <h2>Descrição</h2>
                <p>{ description }</p>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
