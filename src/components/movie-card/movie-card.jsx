import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log("MovieCard props:", { movie, onMovieClick });
  if (!movie) {
    return null; // or some other fallback UI
  }
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }),
  onMovieClick: PropTypes.func.isRequired
};