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
      <h3>Problem by:- @<i>{problem.user.username}</i></h3>
      <h3>Title:-</h3>
      <p>{problem.title}</p>
      <h3>Problem Satement:-</h3>
      <p>{problem.problemstatement.statement}</p>
      <h3>Input:-</h3>
      <p>{problem.problemstatement.input}</p>
      <h3>Output:-</h3>
      <p>{problem.problemstatement.output}</p>
      <h3>Example Input:-</h3>
      <p>{problem.problemstatement.exampleinput}</p>
      <h3>Example Output:-</h3>
      <p>{problem.problemstatement.exampleoutput}</p>
      <h3>Link:-</h3>
      <p>{problem.link}</p>
      <hr />
      <h2>Reviews:-</h2>
      {problem.reviews.length > 0 ? (problem.reviews.map((review)=>{
        return (
          <ul>
            <li>
              <p>{review.rating}</p>
              <p>{review.comment}</p>
            </li>
          </ul>
        )
      })) : ("No reviews yet !!")}
    </div>
  )
}

export default ProblemDetails
