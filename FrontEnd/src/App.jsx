import './App.css'
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Dashboard = React.lazy(()=> import ('./pages/Dashboard'));
const Signin = React.lazy(()=> import('./pages/Signin'));
const CalenderComponent = React.lazy(()=> import("./pages/CalenderComponent"))
import ProtectedRoute from './auth-components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';
const Signup = React.lazy(()=> import ('./pages/Signup'));
const LandingPage = React.lazy(()=> import ('./pages/LandingPage'));
const ProblemDetails = React.lazy(()=> import ('./pages/ProblemDetails'));
const AddProblem = React.lazy(()=> import ('./pages/AddProblem'));
const Profile = React.lazy(()=> import ('./pages/Profile'));
import { UserProvider } from './components/UserContext';
const Edit = React.lazy(()=> import ('./pages/Edit'));

export default function App() {
  
  return (
    <Router>
      <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <div>
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
      </Suspense>
      </div>
    </Router>
  )
}
