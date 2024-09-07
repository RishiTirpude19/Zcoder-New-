import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
    const navigate = useNavigate();
    const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };
  return (
    <div className="landing-container rounded-3xl">
      <div>
        <h1>Welcome to Zcoder</h1>
      </div>
      <div className="button-group">
        <button onClick={handleSignUp} className='button-1'>Sign Up</button>
        <button onClick={handleSignIn} className='button-1'>Sign In</button>
      </div>
    </div>
  )
}

export default LandingPage;
