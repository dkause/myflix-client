// TODO Create a signUp form
import { useState } from 'react'

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
            <h2>Login Form</h2>
            <p>You need to enter a name, your email and a password to register:</p>
            <form onSubmit={handleSubmit}>
                <label >Username, min. 5 characters:

                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label >Password:

                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <label >Email:

                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <p>Not mandatory, but helpfull, your Birthday</p>
                <label >Birthday:

                    <input type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
  )
}
