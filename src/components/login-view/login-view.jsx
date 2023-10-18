import { useState } from 'react'
import PropTypes from 'prop-types'

export const LoginView = ({ onLoggedIn }) => {
  // Username and Password in empty state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // User submits Data in form, we check for testing against openlibrary login data
  // TODO Replace Openlibrary with MyFlix API
  const handleSubmit = (event) => {
    // this prevents the default form behavior, which is to relaod the whole page
    event.preventDefault()

    const data = {
      Username: username,
      Password: password
    }

    fetch('https://movie-api-5rhq.onrender.com/login', { // TODO Replace with render/users "https://movie-api-5rhq.onrender.com/users"
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json()) // Transforms response into json object  to extract teh token
      .then((data) => {
        console.log('Login data: ', data)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user)) // Saves in local browser storage
          localStorage.setItem('token', (data.token))

          onLoggedIn(data.user, data.token) // Passes user and token via onLoggedIn to Mainview
        } else {
          alert('No User found.')
        }
      })
      .catch((e) => {
        alert('Something went wrong')
      })
  }
  // Shows Login Form in Frontend
  return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                />
            </label>
            <label>
                Password:
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>

  )
}
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}
