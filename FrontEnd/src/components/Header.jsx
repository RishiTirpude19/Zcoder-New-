import React from 'react'
import "./Header.css"
function Header() {
  return (
    <div className="navbar">
      <a href="#home" className="nav-link">Home</a>
      <a href="#allproblems" className="nav-link">All Problems</a>
      <a href="#calendar" className="nav-link">Calendar</a>
      <a href="#logout" className="nav-link">Logout</a>
    </div>
  );
}

export default Header
