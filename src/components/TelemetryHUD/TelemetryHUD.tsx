import { useEffect, useState } from 'react';
import './TelemetryHUD.css';

export function TelemetryHUD({ isHidden = false }: { isHidden?: boolean }) {
  const [scrollY, setScrollY] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [activeSector, setActiveSector] = useState('01 // INITIALIZING');

  useEffect(() => {
    // Scroll Tracker for mechanical ring rotation
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Hero section is approx 100vh. Pin the HUD when we start scrolling past it.
      if (window.scrollY > window.innerHeight * 0.3) {
        setIsPinned(true);
      } else {
        setIsPinned(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Sector Tracker
    const sections = [
      { id: 'hero', name: '01 // PIONEER_CORE' },
      { id: 'seed-tech', name: '02 // GENETICS_LAB' },
      { id: 'sustainability', name: '03 // ECO_SYS' },
      { id: 'products', name: '04 // FLAGSHIP_DB' },
      { id: 'legacy', name: '05 // HERITAGE_ARCHIVE' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) setActiveSector(section.name);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Initial query
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // We can't guarantee all sections are mounted instantly, so we setup a small observer loop or just rely on DOM
    const timeout = setTimeout(() => {
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  // Use scrollY directly to compute rotation degrees
  const ring1Rotation = scrollY * 0.15;
  const ring2Rotation = scrollY * -0.25;
  const ring3Rotation = scrollY * 0.1;

  // Compute depth
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const scrollDepth = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)).toFixed(1);

  return (
    <div className={`telemetry-hud-wrapper ${isPinned ? 'is-pinned' : ''} ${isHidden ? 'is-hidden' : ''}`}>
      <div className="telemetry-hud-container">
        
        {/* Dynamic Rings */}
        <div className="telemetry-ring ring-1" style={{ transform: `translate(-50%, -50%) rotate(${ring1Rotation}deg)` }}></div>
        <div className="telemetry-ring ring-2" style={{ transform: `translate(-50%, -50%) rotate(${ring2Rotation}deg)` }}></div>
        <div className="telemetry-ring ring-3" style={{ transform: `translate(-50%, -50%) rotate(${ring3Rotation}deg)` }}></div>
        
        {/* Precision Target Crosshairs */}
        <div className="telemetry-target">
          <div className="t-line h-line"></div>
          <div className="t-line v-line"></div>
          <div className="t-corner tr"></div>
          <div className="t-corner tl"></div>
          <div className="t-corner br"></div>
          <div className="t-corner bl"></div>
        </div>

        {/* Data Readout Panel */}
        <div className="telemetry-readout">
          <div className="readout-block">
            <span className="readout-label">SECTOR</span>
            <span className="readout-val text-brand">{activeSector}</span>
          </div>
          <div className="readout-block">
            <span className="readout-label">DEPTH_AXIS</span>
            <span className="readout-val">{scrollDepth}%</span>
          </div>
          <div className="readout-block">
            <span className="readout-label">SYS_STATUS</span>
            <span className="readout-val">NOMINAL</span>
          </div>
        </div>

      </div>
    </div>
  );
}
