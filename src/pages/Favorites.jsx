import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      musics: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const musics = await getFavoriteSongs();
    this.setState({ loading: false, musics });
  }

  removeFromFavorites = (position) => {
    this.setState((prevState) => {
      const { musics } = prevState;
      musics.splice(position, 1);
      return ({ musics });
    });
  };

  render() {
    const { loading, musics } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        {
          loading
            ? <Carregando />
            : (
              <ul>
                {
                  musics.map((music, index) => (
                    <li key={ music.trackId }>
                      <MusicCard
                        trackname={ music.trackName }
                        previewURL={ music.previewUrl }
                        trackId={ Number(music.trackId) }
                        music={ { ...music } }
                        favWhenMount
                        removeFromFavorites={ this.removeFromFavorites }
                        position={ index }
                      />
                    </li>
                  ))
                }
              </ul>
            )
        }
      </div>
    );
  }
}

export default Favorites;
