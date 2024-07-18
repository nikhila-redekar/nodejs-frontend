// src/components/NavBar.jsx
/*import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <div className="container">
        <span className="navbar-brand">Todo's</span>
        <ul className="nav-links">
          <li><img src='bookstore-logo.png'>Home</img></li>
          <li>Todo's</li>
          <li>New Todo</li>
          <li>Register</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;*/

// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling


function NavBar() {
  return (
    <nav className="navbar">
      <div className="container">
        <span className="navbar-brand"><img src='bookstore-logo.png' alt='Bookstore Logo' /></span>
        <ul className="nav-links">
          <li></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/MainBooks">Books</Link></li>
          <li><Link to="/Author">Author</Link></li>
          <li><Link to="/GenrePage">Genre</Link></li>
          </ul>
      </div>
    </nav>
  );
}

export default NavBar;



