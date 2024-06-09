import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProblemCard from '../components/ProblemCard';

function Dashboard() {

  let [problems , setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(response => {
      setProblems(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
    
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading problems: {error.message}</div>;
  }

  return (
    <div className="dashboard">
      {problems.length > 0 ? (
        problems.map(problem => <ProblemCard key={problem._id} problem={problem} />)
      ) : (
        <div>No problems found</div>
      )}
    </div>
  );
}

export default Dashboard
