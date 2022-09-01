import React from 'react';
import Proptypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackname, previewURL } = this.props;
    return (
      <div>
        <span>{ trackname }</span>
        <audio data-testid="audio-component" src={ previewURL } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${<code>audio</code>}.`}
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackname: Proptypes.string.isRequired,
  previewURL: Proptypes.string.isRequired,
};

export default MusicCard;
