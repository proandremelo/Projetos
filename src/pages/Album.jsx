import React from 'react';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
    };
  }

  // handleFavoriteClick = (song) => {
  //   console.log(song);
  // };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const { artistName, collectionName } = musics[0];
    this.setState({
      artistName,
      albumName: collectionName,
      musics: musics.slice(1, musics.length),
    });
    // console.log(musics);
  }

  render() {
    const { artistName, albumName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
        <ol>
          {
            musics.map((music) => (
              <li key={ music.trackId }>
                <MusicCard
                  trackname={ music.trackName }
                  previewURL={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ { ...music } }
                />
              </li>
            ))
          }
        </ol>
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
