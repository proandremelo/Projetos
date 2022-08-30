import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Login /></Route>
            <Route path="/profile/edit"><ProfileEdit /></Route>
            <Route path="/album/:id"><Album /></Route>
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
