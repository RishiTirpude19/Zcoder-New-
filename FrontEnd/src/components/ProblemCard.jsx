import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProblemCard.css"
const ProblemCard = ({ problem }) => {
    const navigate = useNavigate();
    const handleClick = () => {
    navigate(`/problem/${problem._id}`);
  };

  return (
    <div className="problem-card" onClick={handleClick}>
      <h3>{problem.user.username}</h3>
      <p>{problem.title.toUpperCase()}</p>
    </div>
  );
};

export default ProblemCard;