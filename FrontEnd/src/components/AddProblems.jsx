import React from 'react'
import { useNavigate } from 'react-router-dom';

function AddProblems() {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/addproblem")
    }
  return (
    <button onClick={handleClick}>
        Add Problem
    </button>
  )
}

export default AddProblems
