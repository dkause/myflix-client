/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

export const FavoritesButton = ({ user, movie_id, movies, setUser, token }) => {
  // const favoriteMovies = user && user.FavoriteMovies ? movies.filter((m) => user.FavoriteMovies.includes(m._id)) : []
  // const [user, setUser] = useState (user)
  const isMovieInFavorites = user && user.FavoriteMovies
  const addFavoriteMovie = () => {
    if (isMovieInFavorites) {
      alert('Movie is already in favorites')
    } else {
      // Add the movie to the favorites list

      fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${movie_id}`, {
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
        .then((responseUser) => {
          if (responseUser) {
            localStorage.setItem('user', JSON.stringify(responseUser))
            console.log('Sucessfully added', responseUser.FavoriteMovies)
          }
        })
        // .then(user => setUser(user))
    }
  }

  const removeFavoriteMovie = () => {
    fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}/movies/${movie_id}`, {
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
  // setUser: PropTypes.func.isrequired,
  user: PropTypes.object.isRequired,
  favmovieId: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
}
