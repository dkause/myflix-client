import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

export const MovieView = ({ movie, onBackClick }) => {
  return (
      <div>
        <div>
          <img src={movie.ImagePath}
          style={{ width: '600', height: '400' }}
          alt= {movie.Title}
          />
        </div>
        <h3>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </h3>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <Button onClick={onBackClick}>Back</Button>
      </div>
  )
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
      // Death: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}
