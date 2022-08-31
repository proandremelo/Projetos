import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_SIZE_INPUT = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      artistNameInResult: '',
      albuns: [],
      buttonDisabled: true,
      loading: false,
      searchRequested: false,
    };
  }

  handleChange = ({ target }) => (
    this.setState({
      artist: target.value,
      buttonDisabled: (target.value.length < MIN_SIZE_INPUT),
    })
  );

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ artistNameInResult: artist, loading: true, searchRequested: true });
    const result = await searchAlbumsAPI(artist);
    // console.log(result);
    this.setState({ artist: '', albuns: result, buttonDisabled: true, loading: false });
  };

  render() {
    const {
      artist,
      artistNameInResult,
      loading,
      buttonDisabled,
      searchRequested,
      albuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {
          loading
            ? <Carregando />
            : (
              <div>
                <form>
                  <input
                    type="text"
                    placeholder="Artista"
                    data-testid="search-artist-input"
                    onChange={ this.handleChange }
                    value={ artist }
                  />
                  <button
                    type="button"
                    disabled={ buttonDisabled }
                    data-testid="search-artist-button"
                    onClick={ this.handleClick }
                  >
                    Pesquisar
                  </button>
                </form>
                {
                  searchRequested && (
                    albuns.length > 0
                      ? (
                        <div>
                          <h2>
                            { `Resultado de álbuns de: ${artistNameInResult}` }
                          </h2>
                          <ul>
                            {
                              albuns.map((album) => (
                                <li key={ album.collectionId }>
                                  <Link
                                    to={ `album/${album.collectionId}` }
                                    data-testid={ `link-to-album-${album.collectionId}` }
                                  >
                                    {album.collectionName}
                                  </Link>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      )
                      : <h2>Nenhum álbum foi encontrado</h2>
                  )
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default Search;
