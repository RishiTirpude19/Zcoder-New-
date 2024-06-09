import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import CalenderComponent from "./pages/CalenderComponent"
import ProtectedRoute from './auth-components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';

export default function App() {
  
  return (
    <Router>
      <div className="App">
        <ProtectedRoute><LogoutButton/></ProtectedRoute>
        <div style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/signin" element={<Signin />} />
            <Route path='/calender' element={<CalenderComponent/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}
