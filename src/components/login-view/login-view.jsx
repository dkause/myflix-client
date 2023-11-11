import { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
export const LoginView = ({ onLoggedIn }) => {
  // Username and Password in empty state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  console.log('LoginView Username', username) // ??? Why is this not empty?
  console.log('LoginView Password', password) // ??? Why is this not empty?
  const handleSubmit = (event) => {
    // this prevents the default form behavior, which is to relaod the whole page
    event.preventDefault()

    const data = {
      Username: username,
      Password: password
    }

    fetch('https://movie-api-5rhq.onrender.com/login', { // TODO Replace with render/users "https://movie-api-5rhq.onrender.com/users"
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login data:', data)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user)) // Saves in local browser storage
          localStorage.setItem('token', (data.token))

          onLoggedIn(data.user, data.token) // Passes user and token via onLoggedIn to Mainview
        } else {
          alert('No User found.')
        }
      })
      .catch((err) => {
        alert('Something went wrong')
        console.error(err)
      })
  }
  // Shows Login Form in Frontend
  return (
<>
    <h2>Login</h2>
    <p>Please enter your name and password or signup:</p>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
        // id='Username'
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="5"
        aria-describedby='usernameHelptext'
        />
        <Form.Text style= {{ display: 'none' }} id='usernamedHelptext'>Your Name must be at least five characterslong. Special characters, like underscores, spaces or emojis are not allowed.</Form.Text>
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password"
        // id='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        aria-describedby='passwordHelptext'
        />
        <Form.Text id='passwordHelptext'></Form.Text>
      </Form.Group>
      <Button className='mt-3'type="submit">
        Submit
      </Button>
    </Form>
        </>

  )
}
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}
