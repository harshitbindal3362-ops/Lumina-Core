import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
  isAnimating?: boolean;
}

export function LoadingScreen({ onComplete, isAnimating }: LoadingScreenProps) {
  return (
    <>
      <div className={`loading-veil ${isAnimating ? 'hide' : ''}`}>
        <div className="loading-content">
          <h1 className="brand-logo">PIONEER</h1>
          <div className="loading-divider"></div>
          <p className="loading-subtext">Initializing the digital experience...</p>
          
          <div className="cookie-consent-sim">
            <p>We use cookies to elevate your experience.</p>
            <button className="btn-primary" onClick={onComplete}>Accept & Enter</button>
          </div>
        </div>
      </div>
      
      {/* Motion Graphic Sweeping Layers */}
      <div className={`mg-layer mg-white ${isAnimating ? 'active' : ''}`}></div>
      <div className={`mg-layer mg-green ${isAnimating ? 'active' : ''}`}></div>
    </>
  );
}
