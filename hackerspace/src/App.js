import React from 'react';
import './App.css';
import Home from './components/homepage/Home'
import Message from './components/message/Message'
import Profile from './components/profile/Profile'
import Auth from './components/auth/Auth'
import Register from './components/register/Register'
import { getAuth } from 'firebase/auth'

import {
  Routes,
  Route,
} from "react-router-dom";



function App() {

  return (    
    <Routes>
          <Route path="/" element={<Home />}>
          </Route>

          <Route path="/message" element={<Message />}>
          </Route>

          <Route path="/profile" element={<Profile />}>
          </Route>

          <Route path="/auth" element={<Auth />}>
          </Route>
          
          <Route path="/register" element={<Register />}>
          </Route>
    </Routes>


  );
}

export default App;
