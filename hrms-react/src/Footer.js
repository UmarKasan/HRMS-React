import React from 'react';

export default function Footer() {
	return (
		<nav className="navbar fixed-bottom navbar-expand-lg navbar-light bg-light">
      	<div class="collapse navbar-collapse d-flex justify-content-center">
        	<ul className="navbar-nav">
          		<a className="nav-item nav-link active" href="/About">About</a>
				<a className="nav-item nav-link active" href="/Policy">Policy</a>
      		</ul>
      	</div>
    	</nav>
	)
}