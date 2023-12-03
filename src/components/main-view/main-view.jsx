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
import { useSelector, useDispatch } from 'react-redux'
import { setMovies } from '../../redux/reducers/movies'

export const MainView = () => {
  const storedUser = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')
  const parseUser = JSON.parse(storedUser)
  const [user, setUser] = useState(storedUser ? parseUser : null)
  const [token, setToken] = useState(storedToken || null)
  const movies = useSelector((state) => state.movies.list)
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase()
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      return
    }
    fetch('https://movie-api-5rhq.onrender.com/movies', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log('Daten von der API (data):', data)
        dispatch(setMovies(data))
      })
      .catch((error) => {
        console.error('Ein Fehler ist aufgetreten:', error)
      })
  }, [])
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
              )}
            </Row>
          }
        />
        <Route
          path='/login'
          element={
            <Row className='justify-content-md-center p-5'>
              {user ? (
                <Navigate to='/' />
              ) : (
                <Col md={6}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user)
                      setToken(token)
                    }}
                  />
                </Col>
              )}
            </Row>
          }
        />
        <Route
          path='/profile'
          element={
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
                  {filteredMovies.map((movie) => (
                    <Col
                    key={movie._id}
                    lg={3}
                    md={4}
                    sm={6}
                    className='d-flex align-items-stretch'
                    >
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
              ) : (

                <MovieView />
              )}
            </Row>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
