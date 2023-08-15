import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/HR.JPG';


export default function Footer() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
      		<Link to="/home" className="site-title">
        		<img src={logo} width="30" height="30" 
        		class="d-inline-block align-top" alt="logo"/>
        		<a class="navbar-brand">HR MS</a>
      		</Link>
      	<div class="collapse navbar-collapse">
        	<ul className="navbar-nav">
          		<a className="nav-item nav-link active">About</a>

      		</ul>
      	</div>
    	</nav>
	)
}
