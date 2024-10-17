import React from 'react'
import {BrowserRouter,Routes,Route, Router} from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/login"
import Chat from "./pages/chat"
import SetAvatar from './pages/SetAvatar';
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Chat/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/chat" element={<Chat/>}/>
    <Route path="/avatar" element={<SetAvatar/>}/>
    </Routes>
    </BrowserRouter>
  )
}
