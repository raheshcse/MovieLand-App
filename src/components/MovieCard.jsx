import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext';

const MovieCard = ({ movie }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(WatchlistContext);
  const isSaved = watchlist.some((item) => item.imdbID === movie.imdbID);

  const posterSrc = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.imdbID}`} className="movie-card__media-link">
        <div className="movie-card__image-wrapper">
          <img src={posterSrc} alt={movie.Title} />
        </div>
      </Link>

      <div className="movie-card__body">
        <div className="movie-card__badge-group">
          <span className="movie-card__badge">{movie.Type}</span>
          <span className="movie-card__badge movie-card__badge--secondary">{movie.Year}</span>
        </div>

        <h3>{movie.Title}</h3>
        <div className="movie-card__actions">
          <button
            type="button"
            className={`button button--mini ${isSaved ? 'button--secondary' : ''}`}
            onClick={() => (isSaved ? removeFromWatchlist(movie.imdbID) : addToWatchlist(movie))}
          >
            {isSaved ? 'Saved' : 'Watchlist'}
          </button>
          <Link to={`/movie/${movie.imdbID}`} className="movie-card__details-link">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
