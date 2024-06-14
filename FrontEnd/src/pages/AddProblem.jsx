import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProblem() {
  const [formData, setFormData] = useState({
    title: '',
    problemstatement: {
      statement: '',
      input: '',
      output: '',
      exampleinput: '',
      exampleoutput: '',
    },
    choice: 'public',  // default value
    platform: {
      name: '',
      ratings: 0,
    },
    link: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');

    if (subKey) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/api/problem/addproblem', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-problem-container">
      <h1>Add a New Problem</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Problem Statement</label>
          <textarea name="problemstatement.statement" value={formData.problemstatement.statement} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Input</label>
          <textarea name="problemstatement.input" value={formData.problemstatement.input} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Output</label>
          <textarea name="problemstatement.output" value={formData.problemstatement.output} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Example Input</label>
          <textarea name="problemstatement.exampleinput" value={formData.problemstatement.exampleinput} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Example Output</label>
          <textarea name="problemstatement.exampleoutput" value={formData.problemstatement.exampleoutput} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Choice</label>
          <select name="choice" value={formData.choice} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div>
          <label>Platform Name</label>
          <input type="text" name="platform.name" value={formData.platform.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Platform Ratings</label>
          <input type="number" name="platform.ratings" value={formData.platform.ratings} onChange={handleChange} required />
        </div>
        <div>
          <label>Link</label>
          <input type="url" name="link" value={formData.link} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
}

export default AddProblem;
