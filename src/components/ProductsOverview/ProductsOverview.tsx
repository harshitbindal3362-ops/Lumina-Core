import { useEffect, useRef } from 'react';
import './ProductsOverview.css';
import cornImg from '../../assets/pioneer_corn.jpg';
import soybeansImg from '../../assets/pioneer_soybeans.jpg';
import sorghumImg from '../../assets/pioneer_sorghum.jpg';

interface ProductsOverviewProps {
  onProductClick?: (item: { id: string; title: string; description: string; image: string }) => void;
}

export function ProductsOverview({ onProductClick }: ProductsOverviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestRef: number;
    let targetX = 0;
    let currentX = 0;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Performance Fix: Cache layout metrics to prevent DOM Layout Thrashing on every scroll event
    let metrics = {
      sectionTop: 0,
      sectionHeight: 0,
      maxScrollDist: 0,
      viewportHeight: 0
    };

    const updateMetrics = () => {
      if (!sectionRef.current || !trackRef.current) return;
      metrics.sectionTop = sectionRef.current.offsetTop;
      metrics.sectionHeight = sectionRef.current.offsetHeight;
      metrics.maxScrollDist = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      metrics.viewportHeight = window.innerHeight;
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Ensure we only calculate when the section is actively crossing the viewport
      if (scrollPosition > metrics.sectionTop - metrics.viewportHeight && scrollPosition < metrics.sectionTop + metrics.sectionHeight) {
        // Calculate the raw progress percentage [0 to 1] of our 300vh scroll container
        const rawProgress = (scrollPosition - metrics.sectionTop) / (metrics.sectionHeight - metrics.viewportHeight);
        const progress = Math.min(Math.max(rawProgress, 0), 1);
        
        targetX = progress * metrics.maxScrollDist;
      }
    };

    const renderLoop = () => {
      // 0.08 friction coefficient gives weight to the panel sliding
      currentX = lerp(currentX, targetX, 0.08);

      if (trackRef.current) {
        // Apply Sub-pixel Rendering Hardware Acceleration with rounding to prevent extreme decimal jitter
        const hardwareX = Math.round(currentX * 100) / 100;
        trackRef.current.style.transform = `translate3d(-${hardwareX}px, 0, 0)`;
      }

      requestRef = requestAnimationFrame(renderLoop);
    };

    // Calculate immediately, and attach listener for window reflows
    window.addEventListener('resize', updateMetrics);
    
    // A slight delay guarantees images load before final metrics are built
    const measureTimeout = setTimeout(updateMetrics, 200);

    window.addEventListener('scroll', handleScroll, { passive: true });
    requestRef = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef);
      clearTimeout(measureTimeout);
    };
  }, []);

  const internalProducts = [
    {
      id: "corn",
      title: "Pioneer® Brand Corn",
      description: "Genetically optimized to thrive in the harshest global climates, our elite germplasm delivers unparalleled yield stability, resisting extreme drought and systemic disease pressure.",
      image: cornImg,
    },
    {
      id: "soybeans",
      title: "A Series Soybeans",
      description: "Featuring the revolutionary Enlist E3® weed control trait alongside ultra-premium defensive packages to eradicate SDS and SCN pathogens unconditionally.",
      image: soybeansImg,
    },
    {
      id: "sorghum",
      title: "LumiGEN™ Sorghum",
      description: "A masterclass in water-use efficiency. This defensive juggernaut provides maximal bio-mass ratios on minimal irrigation, preserving aquifers for future generations.",
      image: sorghumImg,
    }
  ];

  const handleCardClick = (e: React.MouseEvent, prod: { id: string; title: string; description: string; image: string }) => {
    e.preventDefault();
    if (onProductClick) onProductClick(prod);
  };

  return (
    <section ref={sectionRef} className="products-scroll-section" id="products">
      <div className="products-sticky-container">
        
        {/* Title layer that stays fixed on screen during horizontal timeline */}
        <div className="products-fixed-header">
          <p className="products-kicker text-gradient">Flagship Portfolios</p>
          <h2 className="products-title">The Foundation<br/>of Agriculture.</h2>
        </div>

        {/* The Track that horizontally slides left based on Y-Axis scroll */}
        <div ref={trackRef} className="products-track">
          
          {/* Inject an empty spacer so the first card doesn't overlap the fixed header title immediately */}
          <div className="track-start-spacer"></div>

          {internalProducts.map((prod) => (
            <a 
              href={`#${prod.id}`}
              key={prod.id} 
              className="parallax-product-card"
              onClick={(e) => handleCardClick(e, prod)}
            >
              <div className="card-glass-panel">
                <div className="card-image-wrapper">
                  <img src={prod.image} alt={prod.title} className="card-parallax-image" loading="lazy" />
                </div>
                <div className="card-text-content">
                  <h3 className="card-title">{prod.title}</h3>
                  <p className="card-description">{prod.description}</p>
                  <button className="btn-secondary card-btn" tabIndex={-1}>Explore Portfolio</button>
                </div>
              </div>
            </a>
          ))}

          {/* End spacing constraint */}
          <div className="track-end-spacer"></div>
          
        </div>
      </div>
    </section>
  );
}
