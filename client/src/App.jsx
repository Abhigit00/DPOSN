import { Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfileCreation from './pages/ProfileCreation'
import Pages from './pages/Pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pages />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profilecreation" element={<ProfileCreation />} />
    </Routes>
  )
}

export default App