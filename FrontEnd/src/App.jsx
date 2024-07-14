import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import CalenderComponent from "./pages/CalenderComponent"
import ProtectedRoute from './auth-components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import ProblemDetails from './pages/ProblemDetails';
import AddProblem from './pages/AddProblem';
import Profile from './pages/Profile';
import { UserProvider } from './components/UserContext';
import Edit from './pages/Edit';

export default function App() {
  
  return (
    <Router>
      <div className="App">
        <LogoutButton/>
        <div style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/addproblem" element={<ProtectedRoute><AddProblem/></ProtectedRoute>} />
            <Route path="/signin" element={<Signin />} />
            <Route path='/calender' element={<ProtectedRoute><CalenderComponent/></ProtectedRoute>}/>
            <Route path="/problem/:id" element={<ProtectedRoute><ProblemDetails /></ProtectedRoute>} />
            <Route path='/user' element={<ProtectedRoute><UserProvider><Profile/></UserProvider></ProtectedRoute>}/>
            <Route path='/user/updateprofile' element={<ProtectedRoute><UserProvider><Edit/></UserProvider></ProtectedRoute>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}
