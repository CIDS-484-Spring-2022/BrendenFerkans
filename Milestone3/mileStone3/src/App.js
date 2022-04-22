import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './Pages/About';
import Home from './Pages/Home';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import Todo from './Pages/Todo';
import NotFound from './Pages/NotFound';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './Footer'
import { AuthProvider, RequireAuth, useAuth } from "./Authentication/Authentication";

function App() {
let isLoggedIn = true;

  return (
    <main>
      <AuthProvider>
        <Router>
          <Nav />
          <Routes>
              <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<RequireAuth> <Settings /> </RequireAuth>} />
              <Route path="/login" element={<Login />} />
              <Route path="/todo" element={<RequireAuth> <Todo /> </RequireAuth>} />
              <Route path='*' element={<NotFound />} />
          </Routes>
      </Router>
    </AuthProvider>
  <Footer/>
   </main>
   );



}//end app.js

export default App;
