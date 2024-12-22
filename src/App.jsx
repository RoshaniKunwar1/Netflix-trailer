import React, { useEffect } from 'react'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase.js'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  //use Navigate hook to redirect logged-in user to home page
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        navigate('/')
      } else {
        console.log('logged Out');
        navigate('/login'); //logged out xa bhane redirect to login page
      }
    })
  }, [])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* url ma / matra gare home page display garxa */}
        <Route path='/login' element={<Login />} />
        {/* url ma /login gare login page display hunxa */}
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App