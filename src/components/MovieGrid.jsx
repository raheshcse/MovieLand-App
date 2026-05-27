import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => {
  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </section>
  );
};

export default MovieGrid;
