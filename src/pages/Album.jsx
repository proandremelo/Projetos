import React from 'react';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
      favMusics: [],
      loading: false,
    };
  }
  
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const musics = await getMusics(id);
    console.log(typeof musics[1].trackId);
    const favs = await getFavoriteSongs();
    const favIds = favs.map((favSong) => favSong.trackId);
    const { artistName, collectionName } = musics[0];
    this.setState({
      artistName,
      albumName: collectionName,
      musics: musics.slice(1, musics.length),
      favMusics: favIds,
      loading: false,
    });
    // console.log(favs.map((favSong) => favSong.trackId));
  }

  render() {
    const { artistName, albumName, musics, favMusics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? <Carregando />
            : (
              <div>
                <h1 data-testid="artist-name">{ artistName }</h1>
                <h2 data-testid="album-name">{ albumName }</h2>
                <ol>
                  {
                    musics.map((music) => (
                      <li key={ music.trackId }>
                        <MusicCard
                          trackname={ music.trackName }
                          previewURL={ music.previewUrl }
                          trackId={ Number(music.trackId) }
                          music={ { ...music } }
                          favWhenMount={ favMusics.includes(music.trackId) }
                        />
                      </li>
                    ))
                  }
                </ol>
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
