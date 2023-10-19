// TODO Create a signUp form
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export const SignupView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }

    fetch('https://movie-api-5rhq.onrender.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful')
        window.location.reload()
      } else {
        alert('Signup failed')
      }
    })
  }
  return (

    <div>
      <h2>SignUp Form</h2>
      <p>You need to enter a username, your email and a password to register:</p>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formUsername'>
        <Form.Label htmlFor='Username'>Username:</Form.Label>
        <Form.Control
        id='Username'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
          aria-describedby='usernameHelptext'
        />
        <Form.Text id='usernamedHelptext'>Your Name must be at least five characters long. Special characters, like underscores, spaces or emojis are not allowed.</Form.Text>
      </Form.Group>
        <Form.Group controlId='Password'>
      <Form.Label>Password:</Form.Label>
        <Form.Control type="password"
        id='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-describedby='passwordHelptext'
        />
        <Form.Text id='passwordHelptext'></Form.Text>
      </Form.Group>
        <Form.Group controlId='Email'>

          <Form.Label>Email:</Form.Label>
          <Form.Control type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
