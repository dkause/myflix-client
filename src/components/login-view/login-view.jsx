import { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/reducers/user'

export const LoginView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      Username: username,
      Password: password
    }

    fetch('https://movie-api-5rhq.onrender.com/login', {
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
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', data.token)

          // onLoggedIn(data.user, data.token)
          dispatch(setUser(data.user))
          // location.reload()
        } else {
          alert('No User found.')
        }
      })
      .catch((err) => {
        alert('Something went wrong')
        console.error(err)
      })
  }
  return (
    <>
      <h2>Login</h2>
      <p>Please enter your name and password or signup:</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength='5'
            aria-describedby='usernameHelptext'
          />
          <Form.Text style={{ display: 'none' }} id='usernamedHelptext'>
            Your Name must be at least five characterslong. Special characters,
            like underscores, spaces or emojis are not allowed.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-describedby='passwordHelptext'
          />
          <Form.Text id='passwordHelptext'></Form.Text>
        </Form.Group>
        <Button className='mt-3' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  )
}
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}
