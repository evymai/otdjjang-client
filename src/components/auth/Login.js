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

    login(user)
      .then((res) => {
        console.log("Response from login:", res)
        if (res) {
          localStorage.setItem("token", res.token)
          localStorage.setItem("userId", res.id) 
          navigate("/")
        } else {
          console.error("Invalid login response:", res)
          window.alert("Invalid login")
        }
      })
      .catch((error) => {
        console.error("Error during login:", error)
        window.alert("Error during login. Please try again later.")
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
        <div className="login-button">
          <button type="submit">Login</button>
        </div>
        <section>
          Not a member yet? <Link to="/register">Create an account!</Link>
        </section>
      </form>
    </div>
  )
}
