import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layouts/AuthenticatedLayout';
import debounce from 'lodash.debounce';

export default function Index({ astuces, categories, filters }) {
    const [search, setSearch] = useState({
        titre: filters.titre || '',
        contenus: filters.contenus || '',
        categorie_id: filters.categorie_id || ''
    });
    
    const [viewMode, setViewMode] = useState('grid');
    const [isSearching, setIsSearching] = useState(false);

    // Recherche interactive avec debounce
    const debouncedSearch = useCallback(
        debounce((searchParams) => {
            router.get(route('astuces.index'), searchParams, {
                preserveState: true,
                replace: true,
                onFinish: () => setIsSearching(false)
            });
        }, 500),
        []
    );

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        const newSearch = { ...search, [name]: value };
        setSearch(newSearch);
        
        if (name === 'categorie_id') {
            setIsSearching(true);
            debouncedSearch(newSearch);
        }
    };

    const handleInputSearch = (e) => {
        const { name, value } = e.target;
        setSearch(prev => ({ ...prev, [name]: value }));
        setIsSearching(true);
        debouncedSearch({ ...search, [name]: value });
    };

    const handleReset = () => {
        setSearch({ titre: '', contenus: '', categorie_id: '' });
        router.get(route('astuces.index'));
    };

    const getTotalResults = () => {
        return astuces.total || astuces.data.length;
    };

    return (
        <Layout>
            <Head title="Astuces" />
            
            <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
                {/* Hero Section */}
                

                <div className="container mx-auto px-4 py-8">
                    {/* Actions Bar */}
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('astuces.create')}
                                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Créer une astuce
                            </Link>
                        </div>
                        
                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-4">
                            <div className="tabs tabs-boxed bg-base-100 shadow-lg">
                                <button 
                                    className={`tab tab-lg ${viewMode === 'grid' ? 'tab-active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <i className="fas fa-th mr-2"></i>Grille
                                </button> 
                                <button 
                                    className={`tab tab-lg ${viewMode === 'list' ? 'tab-active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <i className="fas fa-list mr-2"></i>Liste
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="card bg-base-100 shadow-2xl border border-base-200 mb-8 animate-fade-in-up">
                        <div className="card-body">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-search text-2xl text-primary mr-3"></i>
                                <h2 className="card-title text-2xl">Rechercher des astuces</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                <i className="fas fa-heading mr-2"></i>Titre
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="titre"
                                            placeholder="Rechercher par titre..."
                                            className="input input-bordered input-primary w-full"
                                            value={search.titre}
                                            onChange={handleInputSearch}
                                        />
                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                <i className="fas fa-align-left mr-2"></i>Contenu
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="contenus"
                                            placeholder="Rechercher dans le contenu..."
                                            className="input input-bordered input-primary w-full"
                                            value={search.contenus}
                                            onChange={handleInputSearch}
                                        />
                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                <i className="fas fa-tag mr-2"></i>Catégorie
                                            </span>
                                        </label>
                                        <select
                                            name="categorie_id"
                                            className="select select-bordered select-primary w-full"
                                            value={search.categorie_id}
                                            onChange={handleSearchChange}
                                        >
                                            <option value="">Toutes les catégories</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.titre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 justify-end">
                                    <button 
                                        type="button" 
                                        onClick={handleReset}
                                        className="btn btn-outline btn-warning"
                                    >
                                        <i className="fas fa-undo mr-2"></i>
                                        Réinitialiser
                                    </button>
                                    <div className="indicator">
                                        {isSearching && (
                                            <span className="indicator-item badge badge-primary"></span>
                                        )}
                                        <button 
                                            type="button" 
                                            onClick={() => debouncedSearch(search)}
                                            className="btn btn-primary"
                                        >
                                            <i className="fas fa-search mr-2"></i>
                                            Rechercher
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Info */}
                    {(search.titre || search.contenus || search.categorie_id) && (
                        <div className="alert alert-info shadow-lg mb-6 animate-fade-in-up">
                            <i className="fas fa-info-circle"></i>
                            <span>{getTotalResults()} résultat(s) trouvé(s)</span>
                        </div>
                    )}

                    {/* Astuces Grid/List */}
                    {astuces.data.length > 0 ? (
                        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}`}>
                            {astuces.data.map((astuce, index) => (
                                <div 
                                    key={astuce.id} 
                                    id={`card-${index}`}
                                    className={`card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-0 ${viewMode === 'list' ? 'lg:card-side' : ''}`}
                                    style={{ animation: `fade-in-up 0.6s ease-out ${index * 0.1}s forwards` }}
                                >
                                    {astuce.image && (
                                        <figure className={`${viewMode === 'list' ? 'lg:w-1/3' : ''}`}>
                                            <img
                                                src={`/storage/${astuce.image}`}
                                                alt={astuce.titre}
                                                className={`w-full h-full object-cover ${viewMode === 'list' ? 'h-48 lg:h-full' : 'h-48'}`}
                                            />
                                            {!astuce.etat && (
                                                <div className="absolute top-4 right-4">
                                                    <div className="badge badge-warning badge-lg">
                                                        <i className="fas fa-edit mr-1"></i>
                                                        Brouillon
                                                    </div>
                                                </div>
                                            )}
                                        </figure>
                                    )}
                                    
                                    <div className={`card-body ${viewMode === 'list' ? 'lg:w-2/3' : ''}`}>
                                        <h2 className="card-title text-xl mb-3 hover:text-primary transition-colors duration-300">
                                            {astuce.titre}
                                            {!astuce.etat && !astuce.image && (
                                                <div className="badge badge-warning">
                                                    <i className="fas fa-edit mr-1"></i>
                                                    Brouillon
                                                </div>
                                            )}
                                        </h2>
                                        
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <div className="badge badge-primary badge-outline">
                                                <i className="fas fa-user mr-1"></i>
                                                {astuce.user.name}
                                            </div>
                                            <div className="badge badge-secondary badge-outline">
                                                <i className="fas fa-tag mr-1"></i>
                                                {astuce.categorie.titre}
                                            </div>
                                            <div className="badge badge-accent badge-outline">
                                                <i className="fas fa-calendar mr-1"></i>
                                                {new Date(astuce.created_at).toLocaleDateString('fr-FR')}
                                            </div>
                                        </div>
                                        
                                        <p className="text-base-content/70 line-clamp-3 mb-4">{astuce.description}</p>
                                        
                                        <div className="card-actions justify-end">
                                            <Link
                                                href={route('astuces.show', astuce.slug)}
                                                className="btn btn-primary"
                                            >
                                                <i className="fas fa-eye mr-2"></i>
                                                Lire plus
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 animate-fade-in-up">
                            <div className="text-6xl text-base-300 mb-4">
                                <i className="fas fa-search"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-base-content/60 mb-2">Aucune astuce trouvée</h3>
                            <p className="text-base-content/40 mb-6">Essayez de modifier vos critères de recherche</p>
                            <button onClick={handleReset} className="btn btn-primary">
                                <i className="fas fa-undo mr-2"></i>
                                Voir toutes les astuces
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {astuces.links && astuces.links.length > 3 && (
                        <div className="flex justify-center mt-12 animate-fade-in-up">
                            <div className="join shadow-lg">
                                {astuces.links.map((link, index) => (
                                    <button
                                        key={index}
                                        className={`join-item btn ${link.active ? 'btn-active btn-primary' : 'btn-outline'} ${!link.url ? 'btn-disabled' : ''}`}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fade-in-down {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
                
                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out forwards;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </Layout>
    );
}