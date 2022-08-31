import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
              <div>
                <span data-testid="header-user-name">{ userName }</span>
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
