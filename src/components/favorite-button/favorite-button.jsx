/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types'
import { Button } from 'react-bootstrap'

export const FavoritesButton = ({ user, movie, setUser, token }) => {
  const isMovieInFavorites = user.FavoriteMovies.includes((movie._id))
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
            return response.json()

            // You may want to update the user's favorite movies here
          } else {
            alert('Adding Failed!')
            throw new Error('Adding Failed')
          }
        })
        .then((responseUser) => {
          if (responseUser) {
            localStorage.setItem('user', JSON.stringify(responseUser))
            console.log('Sucessfully added', responseUser.FavoriteMovies)
          }
        })
        .then(console.log(user))
        // .then(user => setUser(user))
    }
  }

  const removeFavoriteMovie = () => {
    console.log('Called remove from api')
    fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${movie._id}`, {
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
      .then((responseUser) => {
        if (responseUser) {
          localStorage.setItem('user', JSON.stringify(responseUser))
          console.log('Sucessfully deleted', responseUser.FavoriteMovies)
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
  // setUser: PropTypes.func.isrequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
}
