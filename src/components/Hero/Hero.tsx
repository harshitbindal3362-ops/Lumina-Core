import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      
      {/* Background Tech Mesh Data Layer */}
      <div className="hero-cyber-grid"></div>

      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      <div className="container hero-content">
        <div className="hero-text-block">
          <h1 className="hero-headline">Pioneering the Future of Seed Tech</h1>
          <p className="hero-subheadline">
            At Pioneer, we're redefining agricultural yields with precision genetics and sustainable innovation for generations to come.
          </p>
          <div className="hero-actions">
            <button 
              className="btn-primary" 
              onClick={() => document.getElementById('seed-tech')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Discover LumiGEN™
            </button>
            <button 
              className="btn-secondary"
              onClick={() => document.getElementById('legacy')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Our Legacy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
