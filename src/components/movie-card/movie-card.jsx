import PropTypes from 'prop-types';

export const MovieCard =  ({ movie, onMovieClick }) => {
  console.log("MovieCard props:", { movie, onMovieClick });
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};