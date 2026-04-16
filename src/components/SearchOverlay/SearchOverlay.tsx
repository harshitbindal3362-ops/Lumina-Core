import { useEffect, useRef, useState } from 'react';
import './SearchOverlay.css';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay UI rendering to allow motion graphic video intro to play standalone for 1.2s
      const timer = setTimeout(() => setShowUI(true), 1200);
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 1300);
      return () => { clearTimeout(timer); clearTimeout(focusTimer); };
    } else {
      setShowUI(false);
    }
  }, [isOpen]);

  const handleSuggestionClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className={`search-overlay ${isOpen ? 'open' : ''}`}>
      
      {/* Intro Motion Graphic Sequence Background */}
      <video
        className="search-intro-video"
        src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-in-blue-19184-large.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={`container search-container ${showUI ? 'ui-visible' : ''}`}>
        <button className="icon-btn search-close" onClick={onClose} aria-label="Close Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div className="search-box">
          <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <input 
              ref={inputRef}
              type="text" 
              className="search-input" 
              placeholder="What are you looking for?" 
              aria-label="Search Pioneer Site"
            />
            <div className="search-line"></div>
          </form>
          
          <div className="search-suggestions">
            <span className="suggestion-label">Popular:</span>
            <a href="#seed-tech" onClick={(e) => handleSuggestionClick(e, '#seed-tech')}>LumiGEN</a>
            <a href="#sustainability" onClick={(e) => handleSuggestionClick(e, '#sustainability')}>Sustainability Goals</a>
            <a href="#products" onClick={(e) => handleSuggestionClick(e, '#products')}>Seed Technologies</a>
          </div>
        </div>
      </div>
    </div>
  );
}
