/* eslint-disable react/prop-types */
// TODO Profile View
// TODO Add a user Profile view (linked to the main navigation menu for authenticated users). As per your project brief, this view should:
// TODO Display user information. You can obtain the logged in user information by using the /users endpoint and then filtering the returning list by comparing the usernames;
// TODO Allow a user to update their user information (username, password, email, date of birth);
// TODO Allow a user to deregister;
// TODO Display a user's favorite movies as a list. For this you’ll need to filter the movies array with something like let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id)). With this, favoriteMovies is just a regular array of movie objects which could, for example, be displayed as movie cards (the MovieCard components would need to be passed to the ProfileView component and rendered there);
import { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap'

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState(user.password)
  const [email, setEmail] = useState(user.email)
  const [birthday, setBirthday] = useState(user.birthday)
  // const shortBirthday = user.Birthday.slice(0, 10)
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
  return (
    <Col>
      <h2>Update your information</h2>
      {/* <p>Hi <span>{user.Username}</span>, this is your Email: <span>{user.Email}</span> and you are born <span>{shortBirthday}</span> </p> */}
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
            </Form.Group>
        <Button className='mt-3' type="submit">Submit</Button>
      </Form>
    </Col>

  )
}
