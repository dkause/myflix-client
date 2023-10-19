/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup-view/signup-view'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export const MainView = () => {
  // State Variables, which are dynamic
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')

  const [user, setUser] = useState(storedUser || null)
  const [token, setToken] = useState(storedToken || null)

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [movies, setMovies] = useState([])
  // Gets the json data from external API
  useEffect(() => {
    if (!token) { // Checks if there is a token
      return
    }
    fetch('https://movie-api-5rhq.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })

      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMovies(data)
      })
  }, [token])
  // Shows login if user is not logged in
  return (
    <>
    <Button variant='warning' onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>Logout</Button>

    <Row className='justify-content-md-center'>
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user)
              setToken(token)
            }} />
          or
          <SignupView />
          </Col>
      ) : selectedMovie
        ? (
          <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
            />
            </Col>
          ) : movies.length === 0 ? (
           <div>The list is empty!</div>
          ) : (
          // Sets setUser, setToken to Null when clicked

          <>
            {movies.map((movie) => (
              <Col key={movie._id} md={3}>

              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie)
                }}
                />
                </Col>
            ))}
          </>
          )}
        </Row>
        </>
  )
}
