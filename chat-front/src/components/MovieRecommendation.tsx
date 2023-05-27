import React, { useState } from 'react';
import { searchMovies } from '../services/imdbAPI';
import { recommentMovie } from '../services/chatAPI';

function MovieRecommendation() {
  const [search, setSearch] = useState<string>('');
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
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="search"
          id="movie"
          value={ search }
          onChange={ (event) => setSearch(event.target.value) }
        />
        <button type="submit">Buscar</button>
      </form>
      <div>
        <h2>Resultados da busca:</h2>
        <select
          multiple
          name="movies"
          id="movies"
          onChange={ (event) => setMovies([...movies, event.target.value]) }
        >
          {
            queryResult.map((movie: string) => (
              <option key={ movie } value={ movie }>{movie}</option>
            ))
          }
        </select>
      </div>
      <div>
        <h2>Filmes selecionados:</h2>
        <ul>
          {
            movies.map((movie: string) => (
              <li key={ movie }>{movie}</li>
            ))
          }
        </ul>
      </div>
      <button onClick={ handleRecommend }>Recomendar filmes</button>
      {
        recommendation && (
          <div>
            <h2>Recomendação:</h2>
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

export default MovieRecommendation;
