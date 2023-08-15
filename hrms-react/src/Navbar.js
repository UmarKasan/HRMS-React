import { Link, useMatch, useResolvedPath } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/HR.jpg';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/home" className="site-title">
        <img src={logo} width="30" height="30" 
        class="d-inline-block align-top" alt="logo"/>
        <a class="navbar-brand">HR MS</a>
      </Link>
      <div class="collapse navbar-collapse">
        <ul className="navbar-nav">
          <CustomLink className="nav-item nav-link active" to="/about">About</CustomLink>
          <CustomLink className="nav-link nav-link active" to="/dashboard">Dashboard</CustomLink>
          <CustomLink className="nav-link nav-link active" to="/search">Search</CustomLink>
          <CustomLink className="nav-link nav-link active" to="/employeeform">Sign Up</CustomLink>        
          <CustomLink className="nav-link nav-link active" to="/login">Log In</CustomLink>
      </ul>
      </div>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
