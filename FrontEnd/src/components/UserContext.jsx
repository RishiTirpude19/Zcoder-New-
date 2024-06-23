import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [problem, setProblem] = useState([]);
  const [solution, setSolution] = useState([]);
  const [otherBookmarkedProblems, setOtherBookmarkedProblems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(response.data._id);
        setUserName(response.data.username);
        setEmail(response.data.email);
        setProblem(response.data.problems);
        setSolution(response.data.solutions);
        setOtherBookmarkedProblems(response.data.otherBookMarkedProblems);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        email,
        setEmail,
        problem,
        setProblem,
        solution,
        setSolution,
        otherBookmarkedProblems,
        setOtherBookmarkedProblems,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


