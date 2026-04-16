import { useState } from 'react'
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen'
import { Hero } from './components/Hero/Hero'
import { Header } from './components/Header/Header'
import { NavigationModal } from './components/NavigationModal/NavigationModal'
import { SearchOverlay } from './components/SearchOverlay/SearchOverlay'
import { SeedTech } from './components/SeedTech/SeedTech'
import { Sustainability } from './components/Sustainability/Sustainability'
import { ProductsOverview } from './components/ProductsOverview/ProductsOverview'
import { Legacy } from './components/Legacy/Legacy'
import { Footer } from './components/Footer/Footer'
import { InteractiveBackground } from './components/InteractiveBackground/InteractiveBackground'
import { ProductDetailOverlay } from './components/ProductDetailOverlay/ProductDetailOverlay'
import { TelemetryHUD } from './components/TelemetryHUD/TelemetryHUD'
import './App.css'

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Gateway State
  const [activeDetail, setActiveDetail] = useState<{ id: string, title: string, description: string, image: string } | null>(null);

  const handleEnter = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setHasEntered(true);
    }, 2500);
  };

  const handleGatewayClick = (item: { id: string, title: string, description: string, image: string }) => {
    setActiveDetail(item);
  };

  return (
    <>
      {!hasEntered && (
        <div className="loading-veil-container">
           <LoadingScreen onComplete={handleEnter} isAnimating={isAnimatingOut} />
        </div>
      )}
      
      <NavigationModal isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <InteractiveBackground isVisible={hasEntered} isZoomed={!!activeDetail} />

      {/* Main interface that flies away on click */}
      <div 
        className={`app-layout ${activeDetail ? 'gateway-fly-away' : ''}`} 
        style={{ opacity: hasEntered ? 1 : 0, transition: 'opacity 800ms ease' }}
      >
         <Header 
           onOpenNav={() => setIsNavOpen(true)} 
           onOpenSearch={() => setIsSearchOpen(true)} 
         />
         <main>
           <Hero />
           <SeedTech onCardClick={handleGatewayClick} />
           <Sustainability />
           <ProductsOverview onProductClick={handleGatewayClick} />
           <Legacy />
         </main>
         <Footer />
      </div>

      <TelemetryHUD isHidden={isNavOpen || isSearchOpen} />

      <ProductDetailOverlay 
        product={activeDetail} 
        onClose={() => setActiveDetail(null)} 
      />
    </>
  )
}

export default App
