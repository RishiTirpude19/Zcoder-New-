import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./LogoutButton.css"

function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <button onClick={handleLogout} className='logout-btn'>
      Logout
    </button>
  );
}

export default LogoutButton
