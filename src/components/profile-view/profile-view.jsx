import { useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'
import PropTypes from 'prop-types'

export const ProfileView = ({ user, token, movies, setUser }) => {
  // console.log('ProfileVIEW-user.birthdate', user.Birthdate)
  const [Username, setUsername] = useState(user ? user.Username : null)
  const [Password, setPassword] = useState([])
  const [Email, setEmail] = useState(user ? user.Email : null)
  const [Birthday, setBirthday] = useState(user ? user.Birthday : null)
  // console.log('Birthday', user.Birthday)
  const date = user ? new Date(user.Birthday) : null
  const shortBirthday = date ? date.toISOString().split('T')[0] : null
  console.log('shortbirthday', shortBirthday)

  const updateData = (event) => {
    event.preventDefault()
    const data = {
      Username,
      Password,
      Email,
      Birthday
    }
    fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        // console.log('profile', data)
        console.log('profile-response', response)
        if (response.ok) {
          return response.json()
        } else {
          alert('Update failed.')
        }
      })
      .then((updatedUser) => {
        alert('Update successful.')
        setUser(updatedUser)
      })
      .catch((error) => {
        alert(error)
      })
  }

  //
  // Delete Account function
  //
  const deleteAccount = () => {
    fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        localStorage.clear()
        alert('Removal successful.')
        window.location.replace('/login')
      } else {
        alert('Removal failed.')
      }
    })
  }
  // Get favorite Movie List
  // ******
  const favoriteMovies =
    user && user.FavoriteMovies
      ? movies.filter((m) => user.FavoriteMovies.includes(m._id))
      : []

  console.log('favorites Movies', favoriteMovies)
  // Output
  return (
    <Row className='justify-content-md-center mt-3 p-5'>
      <Col>
        <h2>Update your information</h2>
        <p>You can change your username, email and password. We have prefilled these with your information.<br/> In order to update, you need to enter your current password.<br/>To change it, simply use a new one.</p>
        <Form onSubmit={updateData}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              id='Username'
              type='text'
              value={Username}
              placeholder={user ? user.Username : ''}
              onChange={(e) => setUsername(e.target.value)}
              minLength='5'
              aria-describedby='usernameHelptext'
            />
            <Form.Text id='usernameHelptext'>
              Your Name must be at least five characters long. Special
              characters, like underscores, spaces or emojis are not allowed.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='Password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby='passwordHelptext'
            />
            <Form.Text id='passwordHelptext' ><p className='text-bg-warning mt-1 p-2 rounded'>
              You MUST enter a password, the current for changing or a new for updating.
            </p>
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='Email'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              value={Email}
              placeholder={user ? user.Email : ''}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Please enter your Birthday:
            </Form.Label>
            <Form.Control
              type='date'
              value={date}
              // placeholder={date}
              onChange={(e) => setBirthday(e.target.value)}
              aria-describedby='birthdayHelptext'
            />
            <Form.Text id='birtdayHelptext'>
              Not necessary, but helpful.
            </Form.Text>
          </Form.Group>
          <Row>
            <Col>
              <Button
                className='mt-3'
                variant='primary'
                onClick={updateData}
                type='submit'
              >
                Update Info
              </Button>
            </Col>
            <Col>
              <Button
                className='mt-3 ml'
                variant='danger'
                onClick={deleteAccount}
                type='submit'
              >
                Delete my Account{' '}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
      {/* Favorite Movies  */}
      <Col>
        <h2>My favorite Movies</h2>
        <Row>
          {favoriteMovies.map((favoriteMovies) => (
            <Col
              md={4}
              className='d-flex align-items-stretch favoriteMoviesList'
              key={favoriteMovies._id}
            >
              <MovieCard
                token={token}
                user={user}
                setUser={setUser}
                movie={favoriteMovies}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}
ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired
  }).isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired
}
