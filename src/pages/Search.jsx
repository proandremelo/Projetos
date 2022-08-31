import React from 'react';
import Header from '../components/Header';

const MIN_SIZE_INPUT = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    if (target.value.length >= MIN_SIZE_INPUT) this.setState({ buttonDisabled: false });
    else this.setState({ buttonDisabled: true });
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <input
            type="text"
            placeholder="Artista"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
