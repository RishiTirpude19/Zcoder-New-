import React from 'react';
import './ProblemCard.css';

const ProblemCard = ({ problem }) => {
  return (
    <div className="problem-card">
      <h3>{problem.user.username}</h3>
      <p>{problem.title.toUpperCase()}</p>
    </div>
  );
};

export default ProblemCard;