import { Link, useMatch, useResolvedPath } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/HR.png';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        {/* Add Home page button as a Logo image */}
        <Link to="/home" class="navbar-brand">
          <img src={logo} width="30" height="30" class="d-inline-block align-top" alt="logo"/>
          <a class="navbar-brand">HR MS</a>
        </Link>
        {/* Add Dropdown linnk button for dynamic screens */}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-row-reverse" id="navbarNav">
          <ul className="navbar-nav">
            <li class="nav-item">
              <CustomLink className="nav-link nav-link active" to="/dashboard">Dashboard</CustomLink>
            </li>
            <li class="nav-item"></li>
              <CustomLink className="nav-link nav-link active" to="/MCsubmission">MC Submission</CustomLink>
            <li class="nav-item">
              <CustomLink className="nav-link nav-link active" to="/employeeform">Employee Form</CustomLink>
            </li>  
            <li class="nav-item">      
              <CustomLink className="nav-link nav-link active" to="/login">Log In</CustomLink>
            </li>  
          </ul>
        </div>
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
