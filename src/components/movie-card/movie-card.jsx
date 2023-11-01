import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FavoritesButton } from '../favorite-button/favorite-button'

export const MovieCard = ({ movies, movie, user }) => {
  // console.log('movie-card_user', user)
  // console.log('movie-card_movie', movie)
  console.log('movies', movies)
  const favoriteMovies = movies.filter((m) =>
  user.FavoriteMovies.includes(m._id)
)
console.log('favoriteMovies', favoriteMovies)
  return (
    <Card className="mb-3">
      <div>{movie._id} </div>
          <FavoritesButton favoriteMovies={favoriteMovies} movie={movie} movies={movies} favMovie={movie._id} user={user} />
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
