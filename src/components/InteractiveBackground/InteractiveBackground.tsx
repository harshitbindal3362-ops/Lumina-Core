import { useEffect, useRef, useState } from 'react';
import './InteractiveBackground.css';

interface InteractiveBackgroundProps {
  isVisible: boolean;
  isZoomed?: boolean;
}

export function InteractiveBackground({ isVisible, isZoomed = false }: InteractiveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Math Helper for buttery smooth interpolation (LERP)
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    if (!videoLoaded || !isVisible) return;

    let requestRef: number;

    // Scroll targets
    let targetScrollY = 0;
    let currentScrollY = 0;

    // Mouse targets
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const maxMouseTranslation = 30; // max pixels the background will shift for mouse

    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? window.scrollY / scrollMax : 0;
      
      // Calculate how many vertical pixels to translate the camera "down"
      // (This physically rolls the background UP, exactly like Corn Revolution's 3D panning)
      const maxScrollTranslate = window.innerHeight * -0.25; // 25vh upward maximum shift
      targetScrollY = progress * maxScrollTranslate;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse offset from center from -0.5 to 0.5
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;

      // Invert it for natural parallax feel
      targetMouseX = -mouseX * maxMouseTranslation;
      targetMouseY = -mouseY * maxMouseTranslation;
    };

    const runRenderLoop = () => {
      // --- LERP Computations (Smoothing out both scroll and mouse) ---
      currentScrollY = lerp(currentScrollY, targetScrollY, 0.05);
      currentMouseX = lerp(currentMouseX, targetMouseX, 0.05);
      currentMouseY = lerp(currentMouseY, targetMouseY, 0.05);

      // --- Apply Heavy Parallax Transformers ---
      if (containerRef.current) {
        // We smoothly translate the giant 130vh container 
        containerRef.current.style.transform = `translate3d(${currentMouseX}px, ${currentMouseY + currentScrollY}px, 0)`;
      }

      requestRef = requestAnimationFrame(runRenderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Kickstart the render loop once we guarantee the video has established context
    requestRef = requestAnimationFrame(runRenderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef);
    };
  }, [videoLoaded, isVisible]);

  return (
    <div 
      className={`interactive-video-bg ${isZoomed ? 'bg-zoomed-in' : ''}`} 
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1200ms ease' }}
    >
      <div className="interactive-video-container" ref={containerRef}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedMetadata={() => setVideoLoaded(true)}
          poster="https://images.unsplash.com/photo-1595861775739-6504a7ee9a2b?q=80&w=2670&auto=format&fit=crop"
        >
          {/* Pexels 200 OK Guaranteed CDN Layer */}
          <source src="https://videos.pexels.com/video-files/12793402/12793402-hd_1280_720_30fps.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="interactive-video-overlay"></div>
    </div>
  );
}
