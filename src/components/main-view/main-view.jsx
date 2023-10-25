/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'
import { NavigationView } from '../navigation-view/navigation-view'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup-view/signup-view'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export const MainView = () => {
  // State Variables, which are dynamic
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')

  const [user, setUser] = useState(storedUser || null)
  const [token, setToken] = useState(storedToken || null)

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
    <BrowserRouter>
      <NavigationView
        user={user}
        onLoggedOut={() => {
          setUser(null)
          localStorage.clear()
        }}
      />
      <Row className='justify-content-md-left'>
        <Routes>
          <Route
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col>

                    <SignupView />
                  </Col>
                )
                }
              </>
            }
          />
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user)
                        setToken(token)
                      }} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (

                  <>

                    {movies.map((movie) => (
                      <Col key={movie._id} lg={3} md={4} sm={6} className='d-flex align-items-stretch'>

                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}

              </>
            }
          />
          <Route
            path='/movies/:movieId'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                )
                  : <MovieView movies={movies}></MovieView>

                }
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
