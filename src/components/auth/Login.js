import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"
import { login } from "../../services/authService"

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username,
      password,
    }

    login(user).then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token)
        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-title">Otdjjang Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="login-btn">
          <button type="submit">Login</button>
        </div>
        <section>
          Not a member yet? <Link to="/register">Create an account!</Link>
        </section>
      </form>
    </div>
  )
}
