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
    <main style={{ textAlign: "center" }}>
      <form className="form-register" onSubmit={handleRegister}>
        <h1>Otdjjang</h1>
        <h2>Register an account</h2>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="register-btn" type="submit">
              Register
            </button>
          </div>
        </fieldset>
        <section>
          Already have an account? <Link to="/login">Login here!</Link>
        </section>
      </form>
    </main>
  )
}
