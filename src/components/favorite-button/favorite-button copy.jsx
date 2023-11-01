import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

// Hm, what do need for this:
// TODO: 1. Write and delete from list
// TODO: 2. Check if movie is on favorite list
// TODO: 3. Change State of Button if movie is on list or not: favorite Movies = y => minus, favorite Movies = null => plus
// TODO: 4. Check if user is logged in => display button
export const FavoritesButton = ({ user, token, movie, setUser }) => {
  console.log('0-favorites-button_user', user)
  console.log('fav-movie', movie)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    console.log('1-favorites-Button_user', user)

    // Check if user is defined and has a list of favoriteMovies
    if (user && user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true) // Set isFavorite to true if the movie is in the favorites list
    }
  }, [])

  const addFavoriteMovie = () => {
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
          alert('Movie added ot Favorites')
          window.location.reload()
        } else {
          alert('Adding Failed!')
        }
      })
      .catch((err) => {
        console.log('error on favmovies: $(err)')
      })
      .then((addFavLocalStorage) => {
        if (addFavLocalStorage) {
          localStorage.setItem('user', JSON.stringify(addFavLocalStorage))
          setIsFavorite(true)
          console.log('sucesss adding favorite movie')
        }
      })
  }
  return (
    <>
      <Button onClick={addFavoriteMovie}>
        <i className="bi bi-star-fill"></i>ADD
      </Button>
      <Button>
        <i className="bi bi-star"></i>Remove
      </Button>
    </>
  )
}
FavoritesButton.propTypes = {
  user: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired,
  setUser: PropTypes.string.isRequired
}
