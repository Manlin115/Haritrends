import React from 'react';

const Hero = () => {
  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Welcome to Hari Trends</h1>
        <p>Discover the Latest Fashion & Elegant Dresses</p>
        <a 
          href="#gallery" 
          className="cta-button"
          onClick={(e) => smoothScroll(e, '#gallery')}
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
};

export default Hero;