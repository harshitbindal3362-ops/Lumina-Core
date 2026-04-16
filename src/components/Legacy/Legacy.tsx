import { useEffect, useRef, useState } from 'react';
import './Legacy.css';
import tractorImg from '../../assets/tractor_legacy.jpg';

const timelineData = [
  { year: '1926', title: 'The Beginning', desc: 'Henry A. Wallace founds Hi-Bred Corn Company in Johnston, Iowa, forever changing the future of agriculture.' },
  { year: '1935', title: 'First Hybrid Dominance', desc: 'Pioneer Hi-Bred becomes the largest seed corn company in the world, proving hybrid vigor at continental scale.' },
  { year: '1952', title: 'Global Expansion', desc: 'International research stations open across South America and Europe, bringing hybrid science to developing nations.' },
  { year: '1973', title: 'Soybean Revolution', desc: 'Pioneer enters the soybean market, applying decades of corn genetics expertise to a new frontier crop.' },
  { year: '1996', title: 'Biotech Era', desc: 'Launch of the first commercially available biotech-enhanced seed traits, ushering in precision agriculture.' },
  { year: '2018', title: 'CRISPR Precision', desc: 'Advanced gene-editing tools allow single-nucleotide precision in breeding, accelerating trait development 10x.' },
  { year: '2026', title: 'The Future', desc: 'AI-driven phenotyping, climate-resilient germplasm, and LumiGEN™ treatments define the next century of Pioneer innovation.' },
];

export function Legacy() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const legacyRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Math Helper for buttery smooth interpolation (LERP)
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    // Visibility observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (legacyRef.current) observer.observe(legacyRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Parallax logic for timeline video
    if (!isTimelineOpen) return;
    
    let requestRef: number;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    
    const maxTranslation = 25; // max pixels the background will shift

    const handleMouseMove = (e: MouseEvent) => {
      if (!legacyRef.current) return;
      const rect = legacyRef.current.getBoundingClientRect();
      const mouseX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) - 0.5;
      const mouseY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)) - 0.5;
      
      targetMouseX = -mouseX * maxTranslation;
      targetMouseY = -mouseY * maxTranslation;
    };

    const renderLoop = () => {
      currentMouseX = lerp(currentMouseX, targetMouseX, 0.08);
      currentMouseY = lerp(currentMouseY, targetMouseY, 0.08);

      if (videoRef.current) {
         // Scale slightly up (1.05) to give room for parallax translation
        videoRef.current.style.transform = `scale(1.05) translate3d(${currentMouseX}px, ${currentMouseY}px, 0)`;
      }

      requestRef = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    requestRef = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef);
    };
  }, [isTimelineOpen]);

  const handleTimelineToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTimelineOpen(!isTimelineOpen);
  };

  return (
    <section ref={legacyRef} className={`legacy-section ${isVisible ? 'is-visible' : ''}`} id="legacy">
      {/* Massive watermark typography functioning as structural texture */}
      <h2 className="legacy-watermark" aria-hidden="true">1926</h2>

      <div className="container legacy-container">
        <div className="legacy-grid">
          
          <div className="legacy-image-col">
            <div className="legacy-image-wrapper">
              <img 
                src={tractorImg} 
                alt="Historical Pioneer farming" 
                loading="lazy" 
                className="legacy-image" 
              />
              <div className="legacy-image-overlay"></div>
            </div>
          </div>

          <div className="legacy-content-col">
            <p className="legacy-kicker text-gradient">Our Heritage</p>
            <h3 className="legacy-title">A Century of Unrelenting Agronomic Invention.</h3>
            
            <p className="legacy-description">
              Rooted in the heartland since 1926, Pioneer was founded on a singular radical idea: 
              that the power of genetics could fundamentally redesign the future of global food security. 
            </p>
            
            <p className="legacy-description">
              From our first commercial hybrid seed corn to modern CRISPR precision breeding, 
              we haven't just adapted to changing climates—we've engineered the plants that dominate them.
            </p>

            <a href="#history" className={`legacy-link ${isTimelineOpen ? 'active' : ''}`} onClick={handleTimelineToggle}>
              {isTimelineOpen ? 'Close Timeline' : 'Explore Timeline'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" height="20" 
                viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" 
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  transform: isTimelineOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.4s ease'
                }}
              >
                 {isTimelineOpen ? (
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                 ) : (
                   <>
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                     <polyline points="12 5 19 12 12 19"></polyline>
                   </>
                 )}
              </svg>
            </a>
          </div>

        </div>

        {/* Inline Expanding Timeline Section */}
        <div className={`inline-timeline-wrapper ${isTimelineOpen ? 'open' : ''}`}>
          <div className="inline-timeline-inner-container">
            <div className="inline-timeline-content">

              {/* Soothing Video Background inside the expanded box */}
              <div className="timeline-video-parallax-container">
                <video 
                  ref={videoRef}
                  className="timeline-bg-video parallax-bg" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-corn-plants-in-a-field-9721-large.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Advanced Motion Graphic CSS Layer overlaying the video */}
              <div className="timeline-mg-overlay">
                <div className="mg-line mg-line-1"></div>
                <div className="mg-line mg-line-2"></div>
                <div className="mg-glow"></div>
              </div>

              <div className="timeline-bg-dimmer"></div>

              <div className="timeline-data-inner">
                <h2 className="timeline-heading">Journey Through Time</h2>
                <p className="timeline-subheading">A century of relentless innovation, from a single idea in Iowa to feeding billions worldwide.</p>

                <div className="timeline-track">
                  {timelineData.map((item, i) => (
                    <div 
                      key={item.year} 
                      className="timeline-item" 
                      style={{ 
                        transitionDelay: isTimelineOpen ? `${0.4 + i * 0.15}s` : '0s' 
                      }}
                    >
                      <div className="timeline-dot"></div>
                      <div className="timeline-card">
                        <span className="timeline-year">{item.year}</span>
                        <h4 className="timeline-card-title">{item.title}</h4>
                        <p className="timeline-card-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
