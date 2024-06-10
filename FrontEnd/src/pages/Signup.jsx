import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import { Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

      const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.post('/api/auth/signup', { username, email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); 
      } catch (error) {
        setError('Error signing up. Please try again.');
      } finally {
        setIsLoading(false);
      }
  };
  return (
       <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label for="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            id='username'
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id='email'
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id='password'
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p>Have an Account ? <Link className='message' to="/signin">Sign In</Link></p>
    </div>
  )
}

export default Signup
