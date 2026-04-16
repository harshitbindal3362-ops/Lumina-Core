import { useState } from 'react';
import './Footer.css';

// Map of anchor targets to real section IDs on the page
const sectionMap: Record<string, string> = {
  '#corn': '#products',
  '#soybeans': '#products',
  '#sorghum': '#products',
  '#alfalfa': '#products',
  '#lumigen': '#seed-tech',
  '#research': '#seed-tech',
  '#breeding': '#seed-tech',
  '#sustainability': '#sustainability',
  '#trials': '#seed-tech',
  '#about': '#legacy',
  '#heritage': '#legacy',
  '#careers': '#footer',
  '#investors': '#footer',
  '#privacy': '#footer',
  '#terms': '#footer',
  '#accessibility': '#footer',
  '#contact': '#footer',
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const realTarget = sectionMap[href];
    if (realTarget) {
      const el = document.querySelector(realTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Fallback toast for truly unresolvable links
    showToast('Coming Soon — Stay Tuned');
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    showToast('✓ Subscribed Successfully');
  };

  return (
    <footer className="global-footer" id="footer">
      {/* Toast notification */}
      {toast && <div className="footer-toast">{toast}</div>}

      <div className="container">
        
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <h2 className="footer-logo">PIONEER</h2>
            <p className="footer-mission">
              Designing the agronomic future.<br/>
              Rooted in legacy. Engineered for tomorrow.
            </p>
          </div>
          
          <div className="footer-links-col">
            <div className="link-group">
              <h4 className="link-group-title">Products</h4>
              <ul className="footer-link-list">
                <li><a href="#corn" onClick={(e) => handleLinkClick(e, '#corn')}>Corn Hybrids</a></li>
                <li><a href="#soybeans" onClick={(e) => handleLinkClick(e, '#soybeans')}>A-Series Soybeans</a></li>
                <li><a href="#sorghum" onClick={(e) => handleLinkClick(e, '#sorghum')}>Sorghum</a></li>
                <li><a href="#alfalfa" onClick={(e) => handleLinkClick(e, '#alfalfa')}>Alfalfa</a></li>
                <li><a href="#lumigen" onClick={(e) => handleLinkClick(e, '#lumigen')}>LumiGEN™ Technology</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">Science</h4>
              <ul className="footer-link-list">
                <li><a href="#research" onClick={(e) => handleLinkClick(e, '#research')}>Agronomy Research</a></li>
                <li><a href="#breeding" onClick={(e) => handleLinkClick(e, '#breeding')}>Precision Breeding</a></li>
                <li><a href="#sustainability" onClick={(e) => handleLinkClick(e, '#sustainability')}>Sustainability Goals</a></li>
                <li><a href="#trials" onClick={(e) => handleLinkClick(e, '#trials')}>Field Trials</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4 className="link-group-title">Company</h4>
              <ul className="footer-link-list">
                <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')}>About Pioneer</a></li>
                <li><a href="#heritage" onClick={(e) => handleLinkClick(e, '#heritage')}>Our Heritage</a></li>
                <li><a href="#careers" onClick={(e) => handleLinkClick(e, '#careers')}>Careers</a></li>
                <li><a href="#investors" onClick={(e) => handleLinkClick(e, '#investors')}>Investors</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter-col">
            <h4 className="link-group-title">The Agronomy Report</h4>
            <p className="newsletter-desc">Subscribe to our monthly technical bulletin for industry-leading insights.</p>
            {subscribed ? (
              <p className="newsletter-success">✓ You're subscribed. Welcome aboard.</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Enter email address" 
                  required 
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="newsletter-submit" aria-label="Subscribe">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            &copy; {currentYear} Corteva Agriscience™ / Pioneer. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#privacy" onClick={(e) => handleLinkClick(e, '#privacy')}>Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#terms" onClick={(e) => handleLinkClick(e, '#terms')}>Terms of Use</a>
            <span className="separator">|</span>
            <a href="#accessibility" onClick={(e) => handleLinkClick(e, '#accessibility')}>Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
