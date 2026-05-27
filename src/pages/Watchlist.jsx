import { useContext } from 'react';
import EmptyState from '../components/EmptyState';
import MovieGrid from '../components/MovieGrid';
import { WatchlistContext } from '../context/WatchlistContext';

const Watchlist = () => {
  const { watchlist } = useContext(WatchlistContext);

  return (
    <div className="watchlist-page">
      <section className="section-headline">
        <div>
          <h2>Your Watchlist</h2>
          <p>Quick access to the movies you want to watch next.</p>
        </div>
      </section>

      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <EmptyState
          title="No saved titles"
          description="Start searching and save movies to your watchlist for later."
        />
      )}
    </div>
  );
};

export default Watchlist;
