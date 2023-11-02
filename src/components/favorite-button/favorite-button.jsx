import { PropTypes } from 'prop-types'
import { Button } from 'react-bootstrap'

export const FavoritesButton = ({ user, movie, favmovieId, token }) => {
  console.log('favButton-movie:id', favmovieId)
  console.log('favoriteMovie', user.FavoriteMovies)
  const listofFavoriteMovies = user.FavoriteMovies
  console.log('listofFavoriteMovies', listofFavoriteMovies)
  const isMovieInFavorites = user.FavoriteMovies.includes(favmovieId)
  console.log('isMovieInFavorites', isMovieInFavorites)
  const addFavoriteMovie = () => {
    if (isMovieInFavorites) {
      alert('Movie is already in favorites')
    } else {
      // Add the movie to the favorites list
      fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${movie._id}`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.ok) {
            alert('Movie added to favorites')
            // You may want to update the user's favorite movies here
          } else {
            alert('Adding Failed!')
          }
        })
    }
  }

  const removeFavoriteMovie = () => {
    fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${favmovieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          alert('Movie deleted from favorites')
          // You may want to update the user's favorite movies here
        } else {
          alert('Deleting Failed!')
        }
      })
  }

  return (
    <>
      {user
        ? (
            isMovieInFavorites
              ? (
          <Button onClick={removeFavoriteMovie}>
            <i className='bi bi-star-fill'></i>Remove
          </Button>
                )
              : (
          <Button onClick={addFavoriteMovie}>
            <i className='bi bi-star'></i>ADD
          </Button>
                )
          )

        : null}
    </>
  )
}
FavoritesButton.propTypes = {
  user: PropTypes.object.isrequired,
  movie: PropTypes.object.isrequired,
  favmovieId: PropTypes.object.isrequired,
  token: PropTypes.object.isrequired
}
