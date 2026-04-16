import './SeedTech.css';
import lumigenImg from '../../assets/lumigen_tech.jpg';
import dnaImg from '../../assets/dna_helix.png';
import digitalImg from '../../assets/digital_agronomy.jpg';

interface SeedTechProps {
  onCardClick?: (item: { id: string; title: string; description: string; image: string }) => void;
}

export function SeedTech({ onCardClick }: SeedTechProps) {
  const cards = [
    {
      id: "lumigen-seedtech",
      title: 'LumiGEN™ Technology',
      description: 'Advanced seed treatments offering unparalleled protection against yield-robbing pests and diseases from day one.',
      image: lumigenImg,
    },
    {
      id: "breeding-seedtech",
      title: 'Breeding & Genetics',
      description: 'Leveraging data science to accelerate genetic gain, ensuring customized trait developments tailored for local environments.',
      image: dnaImg,
    },
    {
      id: "digital-seedtech",
      title: 'Digital Agronomy',
      description: 'Predictive modeling paired with drone-assisted analytics to optimize planting densities and nutrient applications.',
      image: digitalImg,
    }
  ];

  return (
    <section id="seed-tech" className="seed-tech-section">
      <div className="container">
        <div className="seed-tech-header">
          <h2 className="section-title">Revolutionizing Seed Development</h2>
          <p className="section-subtitle">
            Our multi-disciplinary approach connects world-class germplasm, 
            prescriptive analytics, and precision breeding to unlock maximum yield potential across millions of acres.
          </p>
        </div>

        <div className="seed-tech-grid">
          {cards.map((card) => (
            <a 
              key={card.id} 
              href={`#${card.id}`} 
              className="tech-card" 
              onClick={(e) => {
                e.preventDefault();
                if (onCardClick) onCardClick(card);
              }}
            >
              <div className="tech-card-image-wrapper">
                 <img src={card.image} alt={card.title} loading="lazy" className="tech-card-image" />
              </div>
              <div className="tech-card-content">
                <h3 className="tech-card-title">{card.title}</h3>
                <p className="tech-card-description">{card.description}</p>
                <div className="tech-card-link">
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
