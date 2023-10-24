import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

export const MovieCard = ({ movie, onMovieClick }) => {
  console.log('MovieCard props:', { movie, onMovieClick })
  if (!movie) {
    return null // or some other fallback UI
  }
  return (

    <Card onClick={() => {
      onMovieClick(movie)
    }} className='mb-3'>
      <Card.Img variant='top' src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        {/* <Button
          onClick={() => {
            onMovieClick(movie)
          }}
          >Klick to open
        </Button> */}
      </Card.Body>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }),
  onMovieClick: PropTypes.func.isRequired
}
