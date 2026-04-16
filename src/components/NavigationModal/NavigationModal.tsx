import { useState, useEffect } from 'react';
import './NavigationModal.css';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavigationModal({ isOpen, onClose }: NavigationModalProps) {
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay UI rendering to allow motion graphic video intro to play standalone for 1.2s
      const timer = setTimeout(() => setShowUI(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setShowUI(false);
    }
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    onClose();
    // Small delay so the modal closes before scrolling
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className={`nav-modal-overlay ${isOpen ? 'open' : ''}`}>
      
      {/* Intro Motion Graphic Sequence Background */}
      <video
        className="nav-intro-video"
        src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-composed-of-points-12966-large.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={`nav-modal-inner ${showUI ? 'ui-visible' : ''}`}>
        <div className="nav-modal-header container">
          <div className="header-logo">
            {/* Logo removed as requested */}
          </div>
          <button className="icon-btn close-btn" onClick={onClose} aria-label="Close Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="nav-modal-content container">
          <nav className="fullscreen-nav">
            <ul className="nav-list">
              <li className="nav-item" style={{ '--delay': '100ms' } as React.CSSProperties}>
                <a href="#seed-tech" onClick={(e) => handleNavClick(e, '#seed-tech')}>Seed Technology</a>
              </li>
              <li className="nav-item" style={{ '--delay': '200ms' } as React.CSSProperties}>
                <a href="#sustainability" onClick={(e) => handleNavClick(e, '#sustainability')}>Sustainability</a>
              </li>
              <li className="nav-item" style={{ '--delay': '300ms' } as React.CSSProperties}>
                <a href="#products" onClick={(e) => handleNavClick(e, '#products')}>Products</a>
              </li>
              <li className="nav-item" style={{ '--delay': '400ms' } as React.CSSProperties}>
                <a href="#legacy" onClick={(e) => handleNavClick(e, '#legacy')}>Legacy & History</a>
              </li>
              <li className="nav-item" style={{ '--delay': '500ms' } as React.CSSProperties}>
                <a href="#footer" onClick={(e) => handleNavClick(e, '#footer')}>Global Contact</a>
              </li>
            </ul>
          </nav>
          
          <div className="nav-footer-info" style={{ '--delay': '600ms' } as React.CSSProperties}>
            <p className="nav-meta">Get in touch to discover how we are changing the landscape of data-driven agriculture.</p>
            <button className="btn-primary" onClick={() => {
              onClose();
              setTimeout(() => {
                document.querySelector('#seed-tech')?.scrollIntoView({ behavior: 'smooth' });
              }, 400);
            }}>Discover LumiGEN™</button>
          </div>
        </div>
      </div>
    </div>
  );
}
