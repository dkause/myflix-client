import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FavoritesButton } from '../favorite-button/favorite-button'

export const MovieCard = ({ movie, user, setUser, token }) => {
  return (
      <Card className="mb-3">
          <FavoritesButton setUser={setUser} movie={movie} movie_id={movie._id} user={user} token={token} />
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
  movie: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
}
