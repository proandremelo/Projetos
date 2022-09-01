import React from 'react';
import Proptypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      addFavLoading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    const { favWhenMount } = this.props;
    this.setState({ favorite: favWhenMount });
  }

  handleFavChange = async ({ target }) => {
    const { music } = this.props;
    this.setState({ addFavLoading: true });
    if (target.checked) await addSong(music);
    this.setState((prevState) => (
      { addFavLoading: false, favorite: !prevState.favorite }
    ));
  };

  render() {
    const { addFavLoading, favorite } = this.state;
    const { trackname, previewURL, trackId } = this.props;
    return (
      <div>
        {
          addFavLoading
            ? (
              <div>
                <Carregando />
              </div>
            )
            : (
              <div>
                <span>{ trackname }</span>
                <audio data-testid="audio-component" src={ previewURL } controls>
                  <track kind="captions" />
                  {`O seu navegador não suporta o elemento ${<code>audio</code>}.`}
                </audio>
                <label htmlFor="favCheck">
                  <input
                    name="favCheck"
                    type="checkbox"
                    onChange={ this.handleFavChange }
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ favorite }
                  />
                  Favorita
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: Proptypes.shape({}).isRequired,
  trackname: Proptypes.string.isRequired,
  previewURL: Proptypes.string.isRequired,
  trackId: Proptypes.number.isRequired,
  favWhenMount: Proptypes.bool.isRequired,
};

export default MusicCard;
