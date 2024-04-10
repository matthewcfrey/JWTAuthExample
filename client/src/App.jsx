import { useState } from 'react'
import './App.css'

import {Routes, Route, Navigate} from 'react-router-dom'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

import { useAuthContext } from './hooks/useAuthContext.jsx'

function App() {
  const {user} = useAuthContext()

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={user? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
      </Route>
    </Routes>
  )
}

export default App
