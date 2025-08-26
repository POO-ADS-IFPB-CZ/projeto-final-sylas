import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import About from './pages/About';
import Docs from './pages/Docs';

import Header from './components/Header';
import Footer from './components/Footer';
import { UserProvider } from './services/UserProvider';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/create" element={<CreateUser/>}/>
            <Route path="/changePassword" element={<ChangePassword/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about" element={<About/>} />
            <Route path="/docs" element={<Docs/>} />
          </Routes >
        <Footer />
      </Router>
    </UserProvider>
    
  );
}

export default App;
