/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'
import { NavigationView } from '../navigation-view/navigation-view'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup-view/signup-view'
import { ProfileView } from '../profile-view/profile-view'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export const MainView = () => {
  // State Variables, which are dynamic
  // const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedUser = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')
  const parseUser = JSON.parse(storedUser)
  // console.log('main-parseUser', parseUser)
  const [user, setUser] = useState(storedUser ? parseUser : null)
  const [token, setToken] = useState(storedToken || null)

  const [movies, setMovies] = useState([])
  // Gets the json data from external API
  useEffect(() => {
    if (!token) { // Checks if there is a token
      return
    }
    fetch('https://movie-api-5rhq.onrender.com/movies', {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    })

      .then((response) => response.json())
      .then((data) => {
        // console.log('main-data', data)
        setMovies(data)
      })
  }, [token])
  // Shows login if user is not logged in
  // console.log('main', user)
  return (
    <BrowserRouter>

      <NavigationView
        user={user}
        onLoggedOut={() => {
          setUser(null)
          setToken(null)
          localStorage.clear()
        }}
      />
        <Routes>
          <Route
            path='/signup'
            element={
              <Row className='justify-content-md-center p-5'>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={6}>

                    <SignupView />
                  </Col>
                )
                }
              </Row>
            }
          />
          <Route
            path='/login'
            element={
              <Row className='justify-content-md-center p-5'>
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
              </Row>
            }
          />
          <Route
          path='/profile'
          element= {
            <ProfileView
            user={user}
                  token={token}
                  movies={movies}
                  setUser={setUser}
            />
          }
          />
          <Route
            path='/'
            element={
              <Row className='justify-content-md-left p-5'>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (

                  <>

                    {movies.map((movie) => (
                      <Col key={movie._id} lg={3} md={4} sm={6} className='d-flex align-items-stretch'>
                        <MovieCard
                        // movies={movies}
                        movie={movie}
                        user={user}
                        setUser={setUser}
                        token={token}
                        />
                      </Col>
                    ))}
                  </>
                )}

              </Row>
            }
            />
          <Route
            path='/movies/:movieId'
            element={
              <Row className='justify-content-md-left'>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                )
                  : <MovieView movies={movies}></MovieView>

                  }
              </Row>
            }
            />
        </Routes>
    </BrowserRouter>
  )
}
