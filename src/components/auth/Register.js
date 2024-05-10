import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"
import { register } from "../../services/authService"

export const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    const user = {
      username,
      password,
      first_name: firstName,
      email,
    }

    register(user).then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token)
        navigate("/")
      }
    })
  }

  return (
    <div className="login-container">
      <form className="form-register" onSubmit={handleRegister}>
        <h1>Otdjjang</h1>
        <h2>Register an account</h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoFocus
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-group">
          <div className="register-button">
            <button type="submit">Register</button>
          </div>
        </div>

        <section>
          Already have an account? <Link to="/login">Login here!</Link>
        </section>
      </form>
    </div>
  )
}
