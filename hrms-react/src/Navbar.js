import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/home" className="site-title">
        HR Management System
      </Link>
      <ul>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/policy">Policy</CustomLink>
        <CustomLink to="/search">Search</CustomLink>
        <CustomLink to="/signup">Sign Up</CustomLink>        
        <CustomLink to="/login">Log In</CustomLink>
      </ul>
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
