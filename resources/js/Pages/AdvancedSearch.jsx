import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import BaseLayout from '@/Layouts/Base';
import { inertia } from 'framer-motion';

export default function AdvancedSearch({ 
    results: initialResults = [], 
    total_results: initialTotalResults = 0,
    total_posts: initialTotalPosts = 0,
    total_astuces: initialTotalAstuces = 0,
    filters: initialFilters = {},
    authors: initialAuthors = [],
    error: initialError = null
}) {
    const { props } = usePage();
    
    const [filters, setFilters] = useState({
        query: initialFilters.query || '',
        type: initialFilters.type || 'all',
        author: initialFilters.author || '',
        difficulty: initialFilters.difficulty || '',
        has_video: initialFilters.has_video || false,
        date_from: initialFilters.date_from || '',
        date_to: initialFilters.date_to || '',
        per_page: initialFilters.per_page || 15,
        page: initialFilters.page || 1,
    });

    const [results, setResults] = useState(initialResults || []);
    const [isLoading, setIsLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(initialTotalResults || 0);
    const [totalPosts, setTotalPosts] = useState(initialTotalPosts || 0);
    const [totalAstuces, setTotalAstuces] = useState(initialTotalAstuces || 0);
    const [authors, setAuthors] = useState(initialAuthors || []);
    const [error, setError] = useState(initialError);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const searchTimer = setTimeout(() => {
            if (filters.query || filters.type !== 'all' || filters.author || filters.difficulty || 
                filters.has_video || filters.date_from || filters.date_to) {
                fetchResults();
            }
        }, 500);

        return () => clearTimeout(searchTimer);
    }, [filters]);

    const fetchResults = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== '' && value !== false && value !== null) {
                    params.append(key, value);
                }
            });

            const response = await axios.get(route('advanced-search'), { 
                params,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const data = response.data;
            setResults(data.results || []);
            setTotalResults(data.total_results || 0);
            setTotalPosts(data.total_posts || 0);
            setTotalAstuces(data.total_astuces || 0);
            setAuthors(data.authors || []);
            
        } catch (error) {
            console.error('Search error:', error);
            setError('Une erreur est survenue lors de la recherche');
            setResults([]);
            setTotalResults(0);
            setTotalPosts(0);
            setTotalAstuces(0);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            page: 1
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetFilters = () => {
        setFilters({
            query: '',
            type: 'all',
            author: '',
            difficulty: '',
            has_video: false,
            date_from: '',
            date_to: '',
            per_page: 15,
            page: 1,
        });
        setError(null);
    };

    const highlightText = (text, query) => {
        if (!query || !text) return text;
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
    };

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const navigateToResult = (result) => {
        if (!result.slug) return;
        const routeName = result.type === 'post' ? 'posts.show' : 'astuces.show';
        inertia.visit(route(routeName, result.slug));
    };

    // Affichage d'erreur
    if (error) {
        return (
            <BaseLayout>
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="alert alert-error">
                            <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{error}</span>
                            <button onClick={resetFilters} className="btn btn-sm">
                                Réessayer
                            </button>
                        </div>
                    </div>
                </div>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Recherche avancée</h1>
                    
                    {/* Search Bar */}
                    <div className="bg-base-300 rounded-lg shadow p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-grow relative">
                                <input
                                    type="text"
                                    name="query"
                                    placeholder="Rechercher des articles, astuces..."
                                    className="input input-bordered w-full pl-12"
                                    value={filters.query}
                                    onChange={handleFilterChange}
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm text-primary"></span>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowFilters(!showFilters)}
                                className="btn btn-outline"
                            >
                                {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
                            </button>
                        </div>

                        {/* Filters Panel */}
                        {showFilters && (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Type de contenu</span>
                                    </label>
                                    <select 
                                        name="type"
                                        className="select select-bordered w-full"
                                        value={filters.type}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="all">Tous les types</option>
                                        <option value="post">Articles seulement</option>
                                        <option value="astuce">Astuces seulement</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Auteur</span>
                                    </label>
                                    <select 
                                        name="author"
                                        className="select select-bordered w-full"
                                        value={filters.author}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Tous les auteurs</option>
                                        {Array.isArray(authors) && authors.map(author => (
                                            <option key={author.id} value={author.id}>{author.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Difficulté (astuces)</span>
                                    </label>
                                    <select 
                                        name="difficulty"
                                        className="select select-bordered w-full"
                                        value={filters.difficulty}
                                        onChange={handleFilterChange}
                                        disabled={filters.type === 'post'}
                                    >
                                        <option value="">Toutes difficultés</option>
                                        <option value="facile">Facile</option>
                                        <option value="moyen">Moyen</option>
                                        <option value="difficile">Difficile</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Contient une vidéo</span>
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="has_video"
                                            className="toggle toggle-primary"
                                            checked={filters.has_video}
                                            onChange={handleFilterChange}
                                            disabled={filters.type === 'astuce'}
                                        />
                                        <span className="ml-2">{filters.has_video ? 'Oui' : 'Non'}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Date de publication (début)</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date_from"
                                        className="input input-bordered w-full"
                                        value={filters.date_from}
                                        onChange={handleFilterChange}
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Date de publication (fin)</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date_to"
                                        className="input input-bordered w-full"
                                        value={filters.date_to}
                                        onChange={handleFilterChange}
                                        min={filters.date_from}
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Résultats par page</span>
                                    </label>
                                    <select 
                                        name="per_page"
                                        className="select select-bordered w-full"
                                        value={filters.per_page}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button 
                                        onClick={resetFilters}
                                        className="btn btn-outline btn-error"
                                    >
                                        Réinitialiser
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Summary */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-sm text-gray-600">
                                {totalResults > 0 ? (
                                    <>
                                        Affichage de <span className="font-semibold">{(filters.page - 1) * filters.per_page + 1}</span> à{' '}
                                        <span className="font-semibold">
                                            {Math.min(filters.page * filters.per_page, totalResults)}
                                        </span>{' '}
                                        sur <span className="font-semibold">{totalResults}</span> résultats
                                    </>
                                ) : (
                                    'Aucun résultat trouvé'
                                )}
                            </p>
                            {totalResults > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                    ({totalPosts} articles et {totalAstuces} astuces)
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Results List */}
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : Array.isArray(results) && results.length > 0 ? (
                        <>
                            <div className="space-y-4 mb-6">
                                {results.map((result, index) => (
                                    <div key={`${result.type}-${result.id}-${index}`}>
                                        <Link
                                            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                                            href={route(result.type === 'post' ? 'posts.show' : 'astuces.show', result.slug)}
                                        >
                                            <div 
                                                className="bg-base-300 rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
                                                onClick={() => navigateToResult(result)} 
                                            >
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    {result.has_image && result.image && (
                                                        <div className="flex-shrink-0 w-full md:w-40 h-40 bg-base-300 rounded-lg overflow-hidden">
                                                            <img 
                                                                src={`${window.location.origin}/storage/${result.image}`}
                                                                alt={result.title || 'Image'} 
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-grow">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h2 
                                                                className="text-xl font-bold"
                                                                dangerouslySetInnerHTML={{ 
                                                                    __html: highlightText(result.title || 'Sans titre', filters.query) 
                                                                }}
                                                            />
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-xs text-gray-500">
                                                                    {result.published_at || 'Date inconnue'}
                                                                </span>
                                                                {result.type === 'post' && result.has_video && (
                                                                    <span className="badge badge-primary">Vidéo</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p 
                                                            className="text-gray-600 mb-4 line-clamp-2"
                                                            dangerouslySetInnerHTML={{ 
                                                                __html: highlightText(result.excerpt || '', filters.query) 
                                                            }}
                                                        />
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center space-x-2">
                                                                <div className="avatar">
                                                                    <div className="w-8 h-8 rounded-full">
                                                                        <img 
                                                                            src={result.user?.avatar || '/images/default-avatar.png'} 
                                                                            alt={result.user?.name || 'Utilisateur'} 
                                                                            onError={(e) => {
                                                                                e.target.src = '/images/default-avatar.png';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <span className="text-sm font-medium">
                                                                    {result.user?.name || 'Utilisateur inconnu'}
                                                                </span>
                                                            </div>
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
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalResults > filters.per_page && (
                                <div className="flex justify-center mt-8">
                                    <div className="join">
                                        <button 
                                            className="join-item btn"
                                            onClick={() => handlePageChange(filters.page - 1)}
                                            disabled={filters.page === 1}
                                        >
                                            «
                                        </button>
                                        {Array.from({ length: Math.ceil(totalResults / filters.per_page) }, (_, i) => {
                                            const page = i + 1;
                                            const totalPages = Math.ceil(totalResults / filters.per_page);
                                            
                                            if (
                                                page === 1 || 
                                                page === totalPages || 
                                                (page >= filters.page - 2 && page <= filters.page + 2)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        className={`join-item btn ${filters.page === page ? 'btn-active' : ''}`}
                                                        onClick={() => handlePageChange(page)}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (page === filters.page - 3 || page === filters.page + 3) {
                                                return <span key={page} className="join-item btn btn-disabled">...</span>;
                                            }
                                            return null;
                                        })}
                                        <button 
                                            className="join-item btn"
                                            onClick={() => handlePageChange(filters.page + 1)}
                                            disabled={filters.page * filters.per_page >= totalResults}
                                        >
                                            »
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-base-300 rounded-lg shadow p-12 text-center">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium">Aucun résultat trouvé</h3>
                            <p className="mt-2 text-gray-500">
                                Essayez d'ajuster vos critères de recherche ou utilisez des termes différents.
                            </p>
                            <button 
                                onClick={resetFilters}
                                className="mt-4 btn btn-primary"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
}