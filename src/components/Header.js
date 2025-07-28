import React, { useState, useEffect } from 'react';
import BulkOrderModal from './BulkOrderModal';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <a 
          href="#home" 
          className="logo"
          onClick={(e) => smoothScroll(e, '#home')}
        >
          Hari Trendz
        </a>
        <nav>
          <ul className="nav">
            <li>
              <a 
                href="#home"
                onClick={(e) => smoothScroll(e, '#home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about"
                onClick={(e) => smoothScroll(e, '#about')}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#gallery"
                onClick={(e) => smoothScroll(e, '#gallery')}
              >
                Gallery
              </a>
            </li>
            <li>
              <a 
                href="#contact"
                onClick={(e) => smoothScroll(e, '#contact')}
              >
                Contact
              </a>
            </li>
            <li>
              <button 
                className="bulk-order-btn"
                onClick={() => setIsBulkModalOpen(true)}
              >
                Bulk Orders
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      <BulkOrderModal 
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />
    </header>
  );
};

export default Header;