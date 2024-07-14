import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../components/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Edit() {
    const { username, favlanguage, platform, rating } = useContext(UserContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: username || "",
        favlanguage: favlanguage || "",
        platform: platform || "",
        rating: rating || "",
    });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting form data:', formData);
            const response = await axios.put("/api/user/updateprofile", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Response:', response);
            setSuccess(response.data.message);
            navigate("/user");
        } catch (error) {
            console.error('Error during Axios request:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(`Error: ${error.response.data.message || 'Something went wrong'}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request data:', error.request);
                setError('Error: No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                setError(`Error: ${error.message}`);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='username' id='username' onChange={handleChange} value={formData.username} placeholder='Username' />
            <input type="text" name='favlanguage' onChange={handleChange} value={formData.favlanguage} placeholder='Fav Language' />
            <input type="text" name="platform" id="platform" onChange={handleChange} value={formData.platform} placeholder='Platform' />
            <input type="number" name="rating" id="rating" onChange={handleChange} value={formData.rating} placeholder='Rating' />
            <button type='submit'>Done</button>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </form>
    )
}

export default Edit
