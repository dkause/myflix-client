import { PropTypes } from 'prop-types'
import { Button } from 'react-bootstrap'

export const FavoritesButton = ({ user, movie, favmovieId, token }) => {
  console.log('token', token)
  console.log(user.FavoriteMovies)
  const listofFavoriteMovies = user.FavoriteMovies
  const isMovieInFavorites = user.FavoriteMovies.includes(favmovieId)
  const addFavoriteMovie = () => {
    if (isMovieInFavorites) {
      alert('Movie is already in favorites')
    } else {
      // Add the movie to the favorites list

      fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${favmovieId}`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.ok) {
            alert('Movie added to favorites')
            return response.json()

            // You may want to update the user's favorite movies here
          } else {
            console.log(response)

            console.log(user)
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
          alert('Removing from Favorites Failed!')
        }
      })
      .catch((error) => {
        alert(error)
      }

      )
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
  token: PropTypes.string.isrequired
}
