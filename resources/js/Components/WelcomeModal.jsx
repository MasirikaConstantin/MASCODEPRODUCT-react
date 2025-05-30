import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroCarousel = () => {
  const slides = [
    {
      image: '/imagde.svg',
      title: "Bienvenue chez MascodeProduct",
      subtitle: "Développez vos idées en réalité",
      cta: "Découvrir nos services"
    },
    {
      image: '/imagde.svg',
      title: "Solutions innovantes",
      subtitle: "Transformez vos concepts en projets concrets",
      cta: "Voir nos réalisations"
    },
    {
      image: '/imagde.svg',
      title: "Expertise technique",
      subtitle: "Des développeurs passionnés à votre service",
      cta: "Rencontrer l'équipe"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showCTA, setShowCTA] = useState(false);

  // Animation typing effect
  useEffect(() => {
    setDisplayText('');
    setShowCTA(false);
    
    let i = 0;
    const fullText = slides[currentSlide].subtitle;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setShowCTA(true);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentSlide]);

  // Auto-rotation des slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen max-h-[800px] w-full overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-6000 ${index === currentSlide ? 'opacity-80' : 'opacity-20'}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-white"
          >
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg"
            >
              {slides[currentSlide].title}
            </motion.h1>
            
            <div className="h-24 flex items-center justify-center">
              <motion.h2
                className="text-2xl md:text-3xl font-medium mb-8 drop-shadow-md"
              >
                {displayText}
                <span className="ml-1 animate-pulse">|</span>
              </motion.h2>
            </div>

            {showCTA && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button className="btn btn-primary btn-lg rounded-full px-8 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  {slides[currentSlide].cta}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-primary w-6' : 'bg-white/50'}`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
      </div>

      
    </div>
  );
};

export default HeroCarousel;