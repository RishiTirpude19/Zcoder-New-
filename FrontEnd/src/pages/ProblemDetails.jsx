import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProblemDetails() {
     const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    axios.get(`/api/problem/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(response => {
      setProblem(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading problem: {error.message}</div>;
  }

  return (
    <div className='problem-details'>
      <h1>problem by:- {problem.user.username}</h1>
      <p>{problem.title}</p>
    </div>
  )
}

export default ProblemDetails
