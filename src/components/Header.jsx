import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Carregando from './Carregando';
import logo from '../images/Tunes.png';
import pt_br from '../images/bandeirabrasil.png';
import '../style/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      carregando: false,
    };
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    const { name } = await getUser();
    this.setState({ userName: name, carregando: false });
  }

  render() {
    const { userName, carregando } = this.state;
    return (
      <header data-testid="header-component">
        {
          carregando
            ? <Carregando />
            : (
              <div className="main-header">
                <div className="header-cima">
                  <span data-testid="header-user-name">{ userName }</span>
                  <img className="logo-header" src={ logo } alt="logo-trybetunes" />
                  <input className="pt-br" type="image" src={ pt_br } alt="btn-pt-br" />
                </div>
                <div className="header-baixo">
                  <Link to="/search" data-testid="link-to-search">Search</Link>
                  <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                  <Link to="/profile" data-testid="link-to-profile">Profile</Link>
                </div>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
