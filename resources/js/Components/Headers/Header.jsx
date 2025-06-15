import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import ModalLogin from "@/Components/ModalLogin";
import SearchModal from '@/Components/SearchModal';
import NewsletterSubscription from '../NewsletterSubscription';
import { FaRobot } from 'react-icons/fa';

const Header = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showTopBar, setShowTopBar] = useState(true);
  const headerRef = useRef(null);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const lastScrollY = useRef(0);

  // Animation du header au scroll avec seuil plus élevé pour mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = window.innerWidth < 768 ? 15 : 5; // Seuil plus élevé sur mobile
      
      if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Barre supérieure pour newsletter et réseaux sociaux */}
      {showTopBar && (
        <div className="bg-base-300 text-base-content border-b border-base-200/50 text-sm">
          <div className="container mx-auto px-2 sm:px-4 py-2">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <span className="text-center sm:text-left text-xs sm:text-sm">✨ Nouveaux articles chaque semaine</span>
                <button 
                  className="btn btn-xs btn-primary rounded-full whitespace-nowrap"
                  onClick={() => setShowNewsletterModal(true)}
                >
                  S'abonner
                </button>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex gap-2 sm:gap-3">
                  <a href="https://www.instagram.com/mascodeproduct/" className="hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/mascodeproduct" className="hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/negroconstantin" className="hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </a>
                </div>
                
                <button 
                  onClick={() => setShowTopBar(false)}
                  className="btn btn-xs btn-circle btn-ghost hover:bg-base-200 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Newsletter */}
          {showNewsletterModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-base-100 rounded-lg max-w-md w-full p-6 relative">
                <button 
                  onClick={() => setShowNewsletterModal(false)}
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </button>
                
                <NewsletterSubscription />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Header Principal */}
      <header 
        ref={headerRef}
        className={`navbar sticky top-0 z-50 px-2 sm:px-4 transition-all duration-300 ease-out min-h-[60px] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${showTopBar ? 'shadow-sm' : 'shadow-md'}`}
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'hsla(var(--b1) / 0.95)',
          borderBottom: '1px solid hsla(var(--bc) / 0.1)'
        }}
      >
        {/* Container pour contrôler la largeur totale */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Section Gauche: Menu mobile + Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Menu Mobile (Drawer) */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-sm px-2 hover:bg-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link href={route('home')} className="active:bg-primary/20">Accueil</Link></li>
                <li><Link href={route('astuces.index')} className="active:bg-primary/20">Astuces</Link></li>
                  
                  <li><Link href={route('posts.index')} className="active:bg-primary/20">Tous les Posts</Link></li>
                  <li><Link href={route('chat.show')} className="active:bg-primary/20">Chat</Link></li>
              </ul>
            </div>

            {/* Logo */}
            <Link
              href={route('home')} 
              className="logo btn btn-ghost normal-case text-lg sm:text-xl px-2 relative overflow-hidden"
              style={{
                '--x': '0px',
                '--y': '0px',
                '--glow-opacity': '0'
              }}
              onMouseEnter={() => {
                const logo = headerRef.current?.querySelector('.logo');
                if (logo) logo.style.setProperty('--glow-opacity', '0.1');
              }}
              onMouseLeave={() => {
                const logo = headerRef.current?.querySelector('.logo');
                if (logo) logo.style.setProperty('--glow-opacity', '0');
              }}
            >
              <span className="text-primary transition-all duration-300 hover:text-primary-focus font-bold">Mascode</span>
              <span className="transition-all duration-300 hover:text-base-content/80 hidden xs:inline">Blog</span>
              <span 
                className="absolute inset-0 pointer-events-none opacity-[var(--glow-opacity)] transition-opacity duration-300"
                style={{
                  background: `radial-gradient(300px circle at var(--x) var(--y), hsl(var(--p) / 0.4), transparent 70%)`
                }}
              />
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="menu menu-horizontal px-1 gap-1">
              <li>
                <Link href={route('home')} className="hover:bg-primary/10 hover:text-primary rounded-btn transition-all duration-200 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href={route('astuces.index')}
                  className="hover:bg-primary/10 hover:text-primary rounded-btn transition-all duration-200 flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Astuces
                </Link>
              </li>
              
              <li>
                <Link 
                  href={route('posts.index')}
                  className="hover:bg-primary/10 hover:text-primary rounded-btn transition-all duration-200 flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Tous les Posts
                </Link>
              </li>

              <li>
                <Link 
                  href={route('chat.show')}
                  className="hover:bg-primary/10 hover:text-primary rounded-btn transition-all duration-200 flex items-center gap-1"
                >
            <FaRobot className="w-5 h-5" />
                  Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Droite: Recherche + Login */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Bouton Recherche Mobile */}
            <button 
              className="btn btn-ghost btn-circle btn-sm sm:hidden hover:bg-primary/20"
              onClick={() => setSearchModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Barre de Recherche Desktop */}
            <div className="hidden sm:flex">
              <div className="join">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="input input-bordered input-sm sm:input-md join-item w-32 sm:w-40 md:w-64 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onClick={() => setSearchModalOpen(true)}
                  readOnly
                />
                <button 
                  className="btn btn-primary btn-sm sm:btn-md join-item hover:bg-primary-focus transition-all duration-200"
                  onClick={() => setSearchModalOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal de Connexion */}
            <ModalLogin/>
          </div>
        </div>
      </header>

      {/* Modal de Recherche Avancée */}
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </>
  );
};

export default Header;