import React from 'react';
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
            : <span data-testid="header-user-name">{ userName }</span>
        }
      </header>
    );
  }
}

export default Header;
