import React, { useState, useEffect } from 'react';
import BulkOrderModal from './BulkOrderModal';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePaymentsClick = () => {
    setIsBulkModalOpen(true);
    setIsMobileMenuOpen(false);
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
        
        {/* Hamburger Menu Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
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
                Payments
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Side Slide Bar */}
        <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="mobile-sidebar-content">
            <div className="mobile-sidebar-header">
              <h3>Hari Trendz</h3>
              <button 
                className="mobile-sidebar-close"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ×
              </button>
            </div>
            <nav className="mobile-nav">
              <ul>
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
                    className="mobile-payments-btn"
                    onClick={handlePaymentsClick}
                  >
                    Payments
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
      <BulkOrderModal 
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />
    </header>
  );
};

export default Header;