import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Signin.css";
import { Link } from 'react-router-dom';
function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="signin-container h-[20rem] w-[30rem] rounded-3xl flex justify-items-start flex-col">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {error && <p className="error">{error}</p>}
        <div className='email'>
          <label for="email">Email:</label>
          <input
            type="email"
            placeholder='jhonDoe@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id='email'
          />
        </div>
        <div className='password'>
          <label for="password">Password:</label>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id='password'
          />
        </div>
        <div className='btn-cont'>
          <button className='signin-btn ' type="submit">Sign In</button>
        </div>
        
      </form>
      <p className='justify-self-end'>Don't Have an Account ? <Link to="/signup" className='message'>Sign Up</Link></p>
    </div>
  )
}

export default Signin
