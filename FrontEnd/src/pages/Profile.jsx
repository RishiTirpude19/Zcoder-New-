import React, { useContext } from 'react'
import { UserContext } from '../components/UserContext';

function Profile() {  
  const {userName , email , solutions} = useContext(UserContext);
  return (
    <>
      <p>username : {userName}</p>
      <p>Email : {email}</p>
    </>
  )
}

export default Profile
