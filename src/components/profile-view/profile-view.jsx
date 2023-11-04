/* eslint-disable react/prop-types */
// TODO: Display a user's favorite movies as a list. For this you’ll need to filter the movies array with something like let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id)). With this, favoriteMovies is just a regular array of movie objects which could, for example, be displayed as movie cards (the MovieCard components would need to be passed to the ProfileView component and rendered there);
import { useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'

export const ProfileView = ({ user, token, movies, setUser }) => {
  console.log('user', user)
  const [Username, setUsername] = useState(user.Username)
  const [Password, setPassword] = useState([])
  const [Email, setEmail] = useState(user.Email)
  const [Birthday, setBirthday] = useState(user.Birthday)
  // const shortBirthday = user.Birthday.slice(0, 10) FIXME: Birthday Null makes problems
  const updateData = (event) => {
    event.preventDefault()
    const data = {
      Username,
      Password,
      Email,
      Birthday
    }
    console.log('Data', data)
    fetch(`https://movie-api-5rhq.onrender.com/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log('profile', data)
      if (response.ok) {
        alert('Update successful.')
        window.location.reload()
      } else {
        alert('Update failed.')
      }
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
  const favoriteMovies = user && user.FavoriteMovies ? movies.filter((m) => user.FavoriteMovies.includes(m._id)) : []

  // console.log('favorites Movies', favoriteMovies)
  // Output
  return (
    <Row className="justify-content-md-center mt-3 p-5">
      <Col >
        <h2>Update your information</h2>
        {/* FIXME: Birthday not displayed properly <p>Hi <span>{user.Username}</span>, this is your Email: <span>{user.Email}</span> and you are born <span>{shortBirthday}</span> </p> */}
        <p>You can change your username, email and password.</p>
        <Form onSubmit={updateData}>
          <Form.Group>
            <Form.Label htmlFor="Username">Username:</Form.Label>
            <Form.Control
              // id='Username'
              type="text"
              value={Username}
              placeholder={user.Username}
              onChange={(e) => setUsername(e.target.value)}
              minLength="5"
              aria-describedby="usernameHelptext"
            />
            <Form.Text id="usernameHelptext">
              Your Name must be at least five characters long. Special
              characters, like underscores, spaces or emojis are not allowed.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="Password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              // id='Password'
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="passwordHelptext"
            />
            <Form.Text id="passwordHelptext"></Form.Text>
          </Form.Group>
          <Form.Group controlId="Email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={Email}
              placeholder={user.Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="Birthday">
              Please enter your Birthday:
            </Form.Label>
            <Form.Control
              type="date"
              // id='Birthday'
              value={Birthday}
              onChange={(e) => setBirthday(e.target.value)}
              aria-describedby="birthdayHelptext"
            />
            <Form.Text id="birtdayHelptext">
              Not necessary, but helpful.
            </Form.Text>
          </Form.Group>
          <Row>
            <Col>
              <Button
                className="mt-3"
                variant="primary"
                onClick={updateData}
                type="submit"
              >
                Update Info
              </Button>
            </Col>
            <Col>
              <Button
                className="mt-3 ml"
                variant="danger"
                onClick={deleteAccount}
                type="submit"
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
            <Col md={4} className='d-flex align-items-stretch favoriteMoviesList'
              key={favoriteMovies._id}

              // className="d-flex align-items-stretch"
            >
              <MovieCard movie={favoriteMovies} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}
