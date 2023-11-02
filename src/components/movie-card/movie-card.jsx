import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FavoritesButton } from '../favorite-button/favorite-button'

export const MovieCard = ({ movie, user }) => {
  console.log('movie-card_user', user)
  // console.log('movie-card_movie', movie)
  // console.log('movie:id', movie._id)
  console.log('movie-card-Username', user.Username)
  return (
    <Card className="mb-3">
          <FavoritesButton favmovieId={movie._id} user={user} />
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button>Open</Button>
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
  }),
  user: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired
}
