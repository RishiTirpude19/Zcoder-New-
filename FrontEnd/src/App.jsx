import './App.css'
import React from 'react'
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';
import CalenderComponent from './pages/CalenderComponent';
export default function App() {
  return (
    <>
      <CalenderComponent />
    </>
  )
}
