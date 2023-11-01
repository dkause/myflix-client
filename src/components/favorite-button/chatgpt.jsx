import { Button } from 'react-bootstrap'

export const FavoritesButton = ({ user, movie, favMovies, token }) => {
  const isMovieInFavorites = favMovies.some(favMovie => favMovie._id === movie._id)

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
    // Implement logic to remove the movie from the favorites list
    // Similar to the add function but with a DELETE request
  }

  return (
    <>
      {user
        ? (
            isMovieInFavorites
              ? (
          <Button onClick={removeFavoriteMovie}>
            <i className='bi bi-star'></i>Remove
          </Button>
                )
              : (
          <Button onClick={addFavoriteMovie}>
            <i className='bi bi-star-fill'></i>ADD
          </Button>
                )
          )
        : null}
    </>
  )
}
