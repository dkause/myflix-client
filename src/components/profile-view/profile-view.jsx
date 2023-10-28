/* eslint-disable react/prop-types */
// TODO: Display a user's favorite movies as a list. For this you’ll need to filter the movies array with something like let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id)). With this, favoriteMovies is just a regular array of movie objects which could, for example, be displayed as movie cards (the MovieCard components would need to be passed to the ProfileView component and rendered there);
import { useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState(user.password)
  const [email, setEmail] = useState(user.email)
  const [birthday, setBirthday] = useState(user.birthday)
  // const shortBirthday = user.Birthday.slice(0, 10) FIXME: Birthday Null makes problems
  const updateData = (event) => {
    event.preventDefault()

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }

    fetch(`https://movie-api-5rhq.onrender.com/users/${user.username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
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
  const deleteAccount = (event) => {
    fetch(`https://movie-api-5rhq.onrender.com/users/${user.username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert('Removal successful.')
        window.location.reload()
      } else {
        alert('Removal failed.')
      }
    })
  }
  // Get favorite Movie List
  // ******
  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id))

  console.log(favoriteMovies)
  // Output
  return (<Row className='justify-content-md-center mt-3 p-5'>
    <Col className=''>
      <h2>Update your information</h2>
      {/* FIXME: Birthday not displayed properly <p>Hi <span>{user.Username}</span>, this is your Email: <span>{user.Email}</span> and you are born <span>{shortBirthday}</span> </p> */}
      <p>You can change your username, email and password.</p>
      <Form onSubmit={updateData}>
        <Form.Group controlId='formUsername'>
          <Form.Label htmlFor='Username'>Username:</Form.Label>
          <Form.Control
            id='Username'
            type="text"
            value={username}
            placeholder={user.Username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            aria-describedby='usernameHelptext'
          />
          <Form.Text id='usernameHelptext'>Your Name must be at least five characters long. Special characters, like underscores, spaces or emojis are not allowed.</Form.Text>
        </Form.Group>
        <Form.Group controlId='Password'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password"
            id='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby='passwordHelptext'
          />
          <Form.Text id='passwordHelptext'></Form.Text>
        </Form.Group>
        <Form.Group controlId='Email'>

          <Form.Label>Email:</Form.Label>
          <Form.Control type="email"
            value={email}
            placeholder={user.Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='Birthday'>
          <Form.Label htmlFor='Birthday'>Please enter your Birthday:</Form.Label>
          <Form.Control type="date"
            id='Birthday'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            aria-describedby='birthdayHelptext'
          />
          <Form.Text id='birtdayHelptext'>Not necessary, but helpful.</Form.Text>
        </Form.Group><Row>
        <Col>
        <Button className='mt-3' variant='primary' onClick={updateData} type="submit">Update  Info</Button>
        </Col>
        <Col>
        <Button className='mt-3 ml' variant='danger' onClick={deleteAccount} type="submit">Delete my Account </Button>
        </Col>
        </Row>
      </Form>
    </Col>
    {/* Favorite Movies  */}
    <Col>
      <h2>My favorite Movies</h2>
      <>

        {favoriteMovies.map((favoriteMovies) => (
          <Col key={favoriteMovies._id} lg={3} md={4} sm={6} className='d-flex align-items-stretch'>

            <MovieCard movie={favoriteMovies} />
          </Col>
        ))}
      </>
    </Col>
  </Row>
  )
}
