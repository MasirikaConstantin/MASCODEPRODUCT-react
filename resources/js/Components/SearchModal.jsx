import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSearchResults([]);
      document.getElementById('search-input')?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const response = await axios.get(route('search'), {
            params: { query: searchQuery }
          });
          setSearchResults(response.data.results);
        } catch (error) {
          console.error('Erreur lors de la recherche:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigateToResult = (result) => {
    onClose();
    const routeName = result.type === 'post' ? 'posts.show' : 'astuces.show';
    router.visit(route(routeName, result.slug));
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
  };

  if (!isOpen) return null;

  return (
    <dialog id="searchModal" className="modal modal-open">
      <div className="modal-box w-11/12 max-w-3xl relative p-0">
        <button 
          onClick={onClose} 
          className="btn btn-sm btn-circle absolute right-4 top-4 z-10 hover:bg-error/20 hover:text-error"
          aria-label="Fermer"
        >
          ✕
        </button>
        
        <div className="p-6 pb-0 sticky top-0 bg-base-100 z-10 border-b border-base-300">
          <h3 className="font-bold text-2xl mb-4">Recherche</h3>
          
          <div className="relative mb-4">
            <input
              id="search-input"
              type="text"
              placeholder="Rechercher des articles, astuces..."
              className="input input-bordered w-full pl-12 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {isSearching ? (
                <span className="loading loading-spinner loading-sm text-primary"></span>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 pt-4">
          {isSearching ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div 
                  key={`${result.type}-${result.id}`} 
                  className="p-4 hover:bg-base-200 rounded-lg transition-colors duration-150 cursor-pointer border border-base-300"
                  onClick={() => navigateToResult(result)}
                >
                  <div className="flex items-start gap-4">
                    {result.has_image && (
                      <div className="flex-shrink-0 w-20 h-20 bg-base-300 rounded-lg overflow-hidden">
                        <img 
src={`${window.location.origin}/storage/${result.image}`}

                          alt={result.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 
                          className="font-medium text-lg mb-1"
                          dangerouslySetInnerHTML={{ __html: highlightText(result.title, searchQuery) }}
                        />
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{result.published_at}</span>
                          {result.type === 'post' && result.has_video && (
                            <span className="badge badge-sm badge-primary">Vidéo</span>
                          )}
                         
                        </div>
                      </div>
                      <p 
                        className="text-sm text-gray-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: highlightText(result.excerpt, searchQuery) }}
                      />
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                          <div className="avatar">
                            <div className="w-6 h-6 rounded-full">
                              <img src={result.user.avatar} alt={result.user.name} />
                            </div>
                          </div>
                          <span className="text-sm font-medium">{result.user.name}</span>
                        </div>
                        

                        <span className="text-xs text-gray-500">{result.published_at}</span>
                          {result.type === 'post' && (
                            <span className="text-xs badge badge-accent  px-2 py-1 rounded ">
                          Post
                        </span>
                          )}
                          {result.type === 'astuce' && (
                            <span className="text-xs badge badge-secondary px-2 py-1 rounded ">
                            Astuce
                          </span>
                            
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.length > 2 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium">Aucun résultat trouvé</h3>
              <p className="mt-1 text-gray-500">Essayez avec d'autres termes de recherche</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Entrez au moins 3 caractères pour commencer la recherche</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Laravel', 'React', 'Inertia', 'PHP', 'JavaScript', 'CSS'].map((term) => (
                  <span 
                    key={term}
                    className="badge badge-outline cursor-pointer hover:badge-primary transition-all duration-200" 
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </span>
                ))}
              </div>
              <div className="mt-6 text-left">
                <h4 className="font-medium text-gray-700 mb-2">Conseils de recherche :</h4>
                <ul className="text-sm space-y-1 text-gray-500">
                  <li>• Essayez des mots-clés différents ou plus généraux</li>
                  <li>• Vérifiez l'orthographe de vos termes</li>
                  <li>• Utilisez des termes spécifiques pour des résultats plus précis</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>Fermer</button>
      </form>
    </dialog>
  );
}