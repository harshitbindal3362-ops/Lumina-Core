import { useEffect, useRef, useState } from 'react';
import './Sustainability.css';

export function Sustainability() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const metrics = [
    { id: 1, value: "Zero", label: "Net Carbon Ambition", delay: "0.2s" },
    { id: 2, value: "100%", label: "Renewable Energy Goal", delay: "0.4s" },
    { id: 3, value: "30%", label: "Water Savings Profile", delay: "0.6s" }
  ];

  return (
    <section 
      id="sustainability" 
      className={`sustainability-section ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="sustainability-bg">
        {/* Video scrubbing background shows through here */}
        <div className="sus-overlay"></div>
      </div>

      <div className="sustainability-content container">
        <div className="sus-header">
          <p className="sus-kicker text-gradient">Environmental Stewardship</p>
          <h2 className="sus-title">Sustainably<br/>Rooted.</h2>
          <p className="sus-description">
            Pioneer genetically crafts yield-defense mechanisms directly into our seed, 
            drastically cutting the chemical overhead required for global production.
            We are engineering the crops of tomorrow, to protect the world of today.
          </p>
        </div>

        <div className="sus-metrics-grid">
          {metrics.map((metric) => (
            <div 
              key={metric.id} 
              className="sus-metric-item" 
              style={{ transitionDelay: metric.delay }}
            >
              <div className="sus-metric-value text-gradient">{metric.value}</div>
              <div className="sus-metric-label">{metric.label}</div>
              <div className="sus-metric-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
