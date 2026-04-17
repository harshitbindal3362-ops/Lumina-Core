import { useState, useRef } from 'react';
import './Header.css';
import customSong from '../../assets/Primavera [RteM5-tZvAQ].mp3';

interface HeaderProps {
  onOpenNav: () => void;
  onOpenSearch: () => void;
}

export function Header({ onOpenNav, onOpenSearch }: HeaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Attempt to play user's custom song
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => {
          console.log('Audio play blocked:', e);
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <header className="main-header">
      <div className="container header-container">
        <div className="header-logo">
          {/* Logo removed as requested */}
        </div>
        
        <nav className="header-nav">
          <a href="#seed-tech" className="nav-link">Seed Tech</a>
          <a href="#sustainability" className="nav-link">Sustainability</a>
          <a href="#products" className="nav-link">Product Portfolio</a>
          <a href="#legacy" className="nav-link">Legacy</a>
        </nav>

        <div className="header-actions">
          {/* Ambient Soundtrack Toggle */}
          <button className={`icon-btn audio-trigger ${isPlaying ? 'playing' : ''}`} onClick={toggleAudio} aria-label="Toggle Sound" title="Background Ambience">
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            )}
          </button>
          
          {/* The loaded audio must live completely outside the button block to respect DOM Event bubbling */}
           <audio 
            ref={audioRef} 
            loop 
            src={customSong} 
            preload="auto"
          ></audio>
          
          <button className="icon-btn search-trigger" onClick={onOpenSearch} aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className="icon-btn menu-trigger" onClick={onOpenNav} aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
