import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import './App.css';

function App() {
  return (
    <div className="App">
      <ParticlesBackground />
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-box"></div>
        <div className="floating-box"></div>
        <div className="floating-box"></div>
        <div className="floating-box"></div>
      </div>
      
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
