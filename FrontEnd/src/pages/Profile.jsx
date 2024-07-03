import React, { useContext } from 'react'
import { UserContext } from '../components/UserContext';

function Profile() {  
  const {userName , email , solutions ,favLanguage ,platform , rating} = useContext(UserContext);
  return (
    <>
      <p>Username : {userName}</p>
      <p>Email : {email}</p>
      {favLanguage == undefined ? (
        <p>Favorite Language : Please Update your information</p>
      ) : (<p>Favorite Language : {favLanguage}</p>)} 
      {platform == undefined ? (
        <p>Platform : Please Update your information</p>
      ) : (<p>platform : {platform}</p>)} 
      {rating == undefined ? (
        <p>Rating : Please Update your information</p>
      ) : (<p>Rating : {rating}</p>)} 
    </>
  )
}

export default Profile
