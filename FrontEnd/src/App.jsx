import './App.css'
import React from 'react'
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';
export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/user' element={<Profile/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}
