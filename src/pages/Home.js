// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import Course from '../pages/Courses'; 
import Contact from '../pages/Contact'; 
import Footer from '../components/Footer';
import About from './About';

function Home() {
  
  return (
    
      <div>
        <Hero />
        
        <Course showFooter={false} /> {/* Hide footer for these sections */}
        <About showFooter={false} />
        <Contact showFooter={false} />
        <Footer /> {/* Footer only added once in Home */}
      </div>
    
  );
}

export default Home;
