import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './About';
import Home from './Home';
import Settings from './Settings';
import Login from './Login';
import Todo from './Todo';
import NotFound from './NotFound';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navigate } from "react-router-dom";

function App() {
let isLoggedIn = true;
//Loggedin true part should have logout instead of login!!!

if(isLoggedIn)
{
  return (
    <Router>
      <Nav />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
          <Route path='*' element={<NotFound />} />
      </Routes>
   </Router>);
}
else{
    return (
      <main>
    <Router>
      <Nav />
      <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/settings" element={<Navigate replace to="/login" />} />
          <Route path="/todo" element={<Navigate replace to="/login" />} />
          <Route path='*' element={<NotFound />} />
      </Routes>
   </Router>
   <webMessage />
   </main>
   );

}

}

export default App;
