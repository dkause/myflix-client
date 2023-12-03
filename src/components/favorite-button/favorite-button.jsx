import { PropTypes } from 'prop-types'
import { Button } from 'react-bootstrap'

export const FavoritesButton = ({ user, movie, setUser, token }) => {
  console.log('FavoriteButton is renderd: setUser', setUser)
  console.log('Here should be user.Favorites', user.FavoriteMovies)
  const isMovieInFavorites = user.FavoriteMovies.includes(movie._id)
  const addFavoriteMovie = () => {
    if (isMovieInFavorites) {
      alert('Movie is already in favorites')
    } else {
      fetch(
        `https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then((response) => {
          if (response.ok) {
            window.location.reload()
            alert('Movie added to favorites')
            return response.json()
          } else {
            alert('Adding Failed!')
          }
        })
        .then((responseUser) => {
          if (responseUser) {
            localStorage.setItem('user', JSON.stringify(responseUser))
          }
          setUser(responseUser)
        })
        .then((user) => setUser(user))
        .catch((error) => {
          alert(error)
        })
    }
  }

  const removeFavoriteMovie = () => {
    fetch(
      `https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Movie deleted from favorites')
          return response.json()
        } else {
          alert('Removing from Favorites Failed!')
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          setUser(user)
        }
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <>
      {user
        ? (
            isMovieInFavorites
              ? (
          <Button variant='outline-danger' onClick={removeFavoriteMovie}>
            <i className='bi bi-star-fill'></i>Remove
          </Button>
                )
              : (
          <Button variant='outline-success' onClick={addFavoriteMovie}>
            <i className='bi bi-star'></i>ADD
          </Button>
                )
          )
        : null}
    </>
  )
}
FavoritesButton.propTypes = {
  movie: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
}
