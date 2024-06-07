import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Signup() {

  const[formData , setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e)=>{
    setFormData({...formData, [e.target.id] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/signin")
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" name='username' id='username' placeholder='username' onChange={handleChanges}/>
      <br />
      <input type="email" name="email" id="email" placeholder='email' onChange={handleChanges}/>
      <br />
      <input type="password" name="password" id="password" placeholder='password' onChange={handleChanges}/>
      <br />
      <button disabled={loading}>{loading ? "Loading..." : "SignUp"}</button>
      </form>
      <br />
      <p>Already Have an Account ?</p>
      <Link to="/signin">
        Sign in
      </Link>
      <p>{error && "something went wrong"}</p>
    </div>
  )
}
