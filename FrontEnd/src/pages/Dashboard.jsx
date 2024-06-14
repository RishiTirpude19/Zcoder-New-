import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProblemCard from '../components/ProblemCard';
import "./Dashboard.css";
function Dashboard() {

  let [problems , setProblems] = useState([]);
  let [topUsers , setTopUsers] = useState([]);
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

  useEffect(() => {
    axios.get('/api/dashboard/topusers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(response => {
      setTopUsers(response.data);
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
    <div className='container'>
      <div className="dashboard">
      <h1>Problems</h1>
        {problems.length > 0 ? (
          problems.map(problem => <ProblemCard key={problem._id} problem={problem} />)
      ) : (
        <div>No problems found</div>
      )}
    </div>
    <div>
    <h3>Top Users at the platform</h3>
    {topUsers.length > 0 ? (
      <ol>
        {topUsers.map((user) => {
          return (
            <li key={user._id}>{user.username}</li>
          );
        })}
      </ol>
    ) : (
      <div>No user found</div>
    )}
</div>
    </div>
  );
}

export default Dashboard
