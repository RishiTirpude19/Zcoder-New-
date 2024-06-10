import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();
    const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };
  return (
    <div className="landing-container">
      <h1>Welcome to Zcoder</h1>
      <div className="button-group">
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  )
}

export default LandingPage;
