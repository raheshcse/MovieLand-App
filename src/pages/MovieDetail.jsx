import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../services/movieService';
import { WatchlistContext } from '../context/WatchlistContext';
import Spinner from '../components/Spinner';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(WatchlistContext);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isSaved = watchlist.some((item) => item.imdbID === id);

  useEffect(() => {
    const loadMovie = async () => {
      setIsLoading(true);
      setError('');
      try {
        const details = await getMovieById(id);
        setMovie(details);
      } catch (apiError) {
        setError(apiError.message || 'Could not load details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="page-error">
        <h2>Error loading movie</h2>
        <p>{error}</p>
        <button className="button button--secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="movie-detail-page">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Movie details</p>
          <h1>{movie.Title}</h1>
          <p className="movie-meta">
            {movie.Year} · {movie.Type} · {movie.Runtime} · {movie.Genre}
          </p>
        </div>
        <div className="detail-actions">
          <button
            className="button"
            onClick={() => (isSaved ? removeFromWatchlist(id) : addToWatchlist(movie))}
          >
            {isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
          <Link to="/" className="button button--secondary">
            Browse movies
          </Link>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-poster">
          <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/420x630?text=No+Image'} alt={movie.Title} />
        </div>
        <div className="detail-summary">
          <div className="detail-card">
            <h2>Overview</h2>
            <p>{movie.Plot}</p>
          </div>

          <div className="detail-card detail-card--info">
            <h3>Key info</h3>
            <ul>
              <li><strong>Director:</strong> {movie.Director}</li>
              <li><strong>Actors:</strong> {movie.Actors}</li>
              <li><strong>Released:</strong> {movie.Released}</li>
              <li><strong>Language:</strong> {movie.Language}</li>
              <li><strong>IMDB Rating:</strong> {movie.imdbRating}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
