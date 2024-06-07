import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { signInStart , signInSuccess ,signInFailure } from '../redux/user/userSlice';
import {useDispatch, useSelector} from "react-redux"
export default function Signin() {

  const[formData , setFormData] = useState({});
  const {loading ,error }= useSelector((state)=> state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleChanges = (e)=>{
    setFormData({...formData, [e.target.id] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      
      if (data.success === false) {
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/user")
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
      <input type="email" name="email" id="email" placeholder='email' onChange={handleChanges}/>
      <br />
      <input type="password" name="password" id="password" placeholder='password' onChange={handleChanges}/>
      <br />
      <button disabled={loading}>{loading ? "Loading..." : "SignIn"}</button>
      </form>
      <br />
      <p>Dont Have an Account ?</p>
      <Link to="/signup">
        Sign Up
      </Link>
      <p>{error ? error.message || "something went wrong" : ""}</p>
    </div>
  )
}
