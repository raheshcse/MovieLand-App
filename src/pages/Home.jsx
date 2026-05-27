import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';
import { searchMovies } from '../services/movieService';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('Spider-Man');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError('Please enter a movie title to search.');
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (apiError) {
      setError(apiError.message || 'Unable to load movies.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Movie Discovery Studio</p>
          <h1>Find new favorites, plan your next watch, and save the best films.</h1>
          <p className="hero-copy">
            Search the OMDb catalog with a modern movie hub experience. Browse details,
            save your watchlist, and jump into a tailored discovery workflow.
          </p>
        </div>

        <div className="hero-card">
          <h2>Explore top titles</h2>
          <p>Start with a search term — action, sci-fi, drama, or your favorite year.</p>
          <SearchBar value={searchTerm} onChange={setSearchTerm} onSubmit={handleSearch} />
        </div>
      </section>

      <section className="section-headline">
        <div>
          <h2>Recommended movies</h2>
          <p>Search results from OMDb and a curated watchlist workflow.</p>
        </div>
      </section>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <EmptyState title="Oops, something went wrong" description={error} />
      ) : movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <EmptyState
          title="No movies found"
          description="Try a different title, genre, or year to discover more movies."
        />
      )}
    </div>
  );
};

export default Home;
