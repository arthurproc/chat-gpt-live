import React, { useState } from 'react';
import styles from './MovieRecommend.module.css';
import { searchMovies } from '../../services/imdbAPI';
import { recommentMovie } from '../../services/chatAPI';

function MovieRecommend() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<string[]>([]);
  const [queryResult, setQueryResult] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await searchMovies(search);

    if (response) {
      setQueryResult(response);
    }
  };

  const handleRecommend = async () => {
    const response = await recommentMovie(movies);

    if (response) {
      setRecommendation(response);
    }
  };

  return (
    <div className={ styles.container }>
      <form onSubmit={ handleSubmit } className={ styles.form }>
        <input
          type="text"
          name="search"
          id="movie"
          value={ search }
          onChange={ (event) => setSearch(event.target.value) }
          className={ styles.input }
        />
        <button type="submit" className={ styles.button }>Buscar</button>
      </form>
      <div>
        <h2 className={ styles.heading }>Resultados da busca:</h2>
        <select
          multiple
          name="movies"
          id="movies"
          onChange={ (event) => setMovies([...movies, event.target.value]) }
          className={ styles.select }
        >
          {
            queryResult.map((movie: string) => (
              <option key={ movie } value={ movie }>{movie}</option>
            ))
          }
        </select>
      </div>
      <div>
        <h2 className={ styles.heading }>Filmes selecionados:</h2>
        <ul>
          {
            movies.map((movie: string) => (
              <li key={ movie }>{movie}</li>
            ))
          }
        </ul>
      </div>
      <button
        onClick={ handleRecommend }
        className={ styles.button }
      >
        Recomendar filmes
      </button>
      {
        recommendation && (
          <div>
            <h2 className={ styles.heading }>Recomendação:</h2>
            <ul>
              {
                recommendation.map((movie: string) => (
                  <li key={ movie }>{movie}</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  );
}

export default MovieRecommend;
