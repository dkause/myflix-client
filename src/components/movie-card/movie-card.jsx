import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FavoritesButton } from '../favorite-button/favorite-button'

export const MovieCard = ({ movie, user }) => {
  return (

    <Card className='mb-3'>
      <Card.Img variant='top' src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <FavoritesButton>{ user, movie }</FavoritesButton>
          <Button >
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
}
