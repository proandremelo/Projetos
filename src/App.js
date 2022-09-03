import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logado: false,
      perfilEditado: false,
    };
  }

  logar = () => {
    this.setState({ logado: true });
  };

  editarProfile = () => {
    this.setState({ perfilEditado: true });
  };

  render() {
    const { logado, perfilEditado } = this.state;
    return (
      <div>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              { logado ? <Redirect to="/search" /> : <Login logar={ this.logar } /> }
            </Route>
            <Route path="/profile/edit">
              {
                perfilEditado
                  ? <Redirect to="/profile" />
                  : <ProfileEdit editarProfile={ this.editarProfile } />
              }
            </Route>
            <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route path="/profile"><Profile /></Route>
            <Route path="/search"><Search /></Route>
            <Route path="/favorites"><Favorites /></Route>
            <Route path="*"><NotFound /></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
