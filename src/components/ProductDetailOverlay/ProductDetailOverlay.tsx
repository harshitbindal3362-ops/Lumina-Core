import { useEffect, useState } from 'react';
import './ProductDetailOverlay.css';

interface ProductDetailOverlayProps {
  product: { id: string; title: string; description: string; image: string } | null;
  onClose: () => void;
}

export function ProductDetailOverlay({ product, onClose }: ProductDetailOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [requestState, setRequestState] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    if (product) {
      setRequestState('idle');
      // Delay visibility to allow the main layout to "fly away"
      const t = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(t);
    } else {
      setIsVisible(false);
    }
  }, [product]);

  const handleClose = () => {
    setIsVisible(false);
    // Delay actual teardown to allow fade out
    setTimeout(() => onClose(), 600);
  };

  const handleActionClick = () => {
    if (requestState !== 'idle') return;
    setRequestState('sending');
    setTimeout(() => setRequestState('sent'), 1000); // Simulate network latency
  };

  if (!product && !isVisible) return null;

  return (
    <div className={`product-detail-overlay ${isVisible ? 'active' : ''}`}>
      <div className="overlay-content">
        <button className="close-overlay-btn" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Return to Landscape
        </button>

        <div className="detail-grid">
          <div className="detail-text">
            <h2 className="detail-title">{product?.title}</h2>
            <p className="detail-description">{product?.description}</p>
            
            <div className="detail-stats">
              <div className="stat-block">
                <span className="stat-value text-gradient">98%</span>
                <span className="stat-label">Yield Consistency</span>
              </div>
              <div className="stat-block">
                <span className="stat-value text-gradient">Zero</span>
                <span className="stat-label">Systemic Risk</span>
              </div>
            </div>

            <button 
              className={`btn-primary detail-action ${requestState !== 'idle' ? 'btn-disabled' : ''}`}
              onClick={handleActionClick}
              disabled={requestState !== 'idle'}
              style={{
                transition: 'all 0.3s ease',
                backgroundColor: requestState === 'sent' ? '#2e7d32' : '',
                borderColor: requestState === 'sent' ? '#4caf50' : ''
              }}
            >
              {requestState === 'idle' && 'Request Agronomic Data'}
              {requestState === 'sending' && 'Processing...'}
              {requestState === 'sent' && '✓ Request Sent'}
            </button>
          </div>
          
          <div className="detail-hero-image">
             <img src={product?.image} alt={product?.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
