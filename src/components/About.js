import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="section">
        <h2>About Hari Trends</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to Hari Trends, your premier destination for elegant and fashionable dresses. 
              Since our establishment, we have been dedicated to bringing you the latest trends in 
              women's fashion with a focus on quality, style, and affordability.
            </p>
            <p>
              Our carefully curated collection features everything from casual everyday wear to 
              stunning evening gowns, ensuring that every woman can find the perfect dress for 
              any occasion. We believe that fashion is a form of self-expression, and our mission 
              is to help you express your unique style with confidence.
            </p>
            <p>
              At Hari Trends, we pride ourselves on exceptional customer service and attention to 
              detail. Our team of fashion experts is always ready to help you find the perfect 
              outfit that makes you look and feel amazing.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Fashion boutique interior" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;