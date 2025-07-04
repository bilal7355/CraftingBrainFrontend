// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Contact from './pages/Contact';
import Course from './pages/Courses';
import Home from  './pages/Home';
import RegisterPage from './pages/Register';
import LearningDashboard from './pages/LearningDashboard';
import ScrollToTop from './components/ScrollToTop';
import ScanAndPayPage from './pages/payment';

import Workshop from './pages/workshop';


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Home key="home"/>} />
        <Route path="/about" element={<About key="about"/>} />
        <Route path="/contact" element={<Contact key="contact"/>} />
        <Route path="/courses" element={<Course key="courses"/>} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<LearningDashboard />} />
        <Route path="/payment" element={<ScanAndPayPage />} />

        <Route path="/workshop" element={<Workshop />} />
      </Routes>
    </Router>
  );
}

export default App;
