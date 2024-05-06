import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/articles">
          Clothes
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/outfits">
          My Outfits
        </Link>
      </li>
      {localStorage.getItem("token") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("token")
              navigate("/", { replace: true })
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  )
}
