import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
  const {currUser} = useSelector(state => state.user);
  return (
    <div>
        <h1>Home</h1>
      <ul>
        <Link to="/dashboard">
        <li>Dashboard</li>
        </Link>
        <Link to="/signin">
        <li>Signin</li>
        </Link>
        <Link to="/signup">
        <li>SignUp</li>
        </Link>
        <Link to="/user">
        <li>Profile</li>
        </Link>
      </ul>
    </div>
  )
}

export default Header
