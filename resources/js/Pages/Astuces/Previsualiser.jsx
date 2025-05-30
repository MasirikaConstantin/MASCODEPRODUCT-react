// resources/js/Pages/Astuces/Previsualiser.jsx
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Pagination from '@/Components/Pagination';

export default function Previsualiser() {
    const { astuce, ast1, commentaires } = usePage().props;
    
    // Déterminer la classe de langage pour le code
    const getLanguageClass = (categorieId) => {
        const languageMap = {
            1: 'language-csv',
            33: 'language-css',
            3: 'language-php',
            4: 'language-javascript',
            5: 'language-python',
            6: 'language-java'
        };
        return languageMap[categorieId] || 'language-html';
    };
    
    const languageClass = getLanguageClass(astuce.categorie_id);

    return (
        <AuthenticatedLayout>
            <Head title={astuce.titre} />
            
            <div className="w-full p-6 rounded-lg shadow-md">
                <article className="mx-auto w-full max-w-2xl">
                    {/* En-tête */}
                    <header className="mb-4 lg:mb-6">
                        <div className="flex items-center mb-6">
                            <div className="inline-flex items-center mr-3 text-sm">
                                <button className="focus:outline-none" onClick={() => document.getElementById('userModal').showModal()}>
                                    {astuce.user.image ? (
                                        <img 
                                            className="mr-4 w-16 h-16 rounded-full border-2 border-indigo-500" 
                                            src={`${window.location.origin}/storage/${astuce.user.image}`}

                                            alt={astuce.user.name} 
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                        </div>
                                    )}
                                </button>
                                
                                <div>
                                    <Link 
                                        href={route('user.profil', { 
                                            user: astuce.user.id, 
                                            nom: astuce.user.name.toLowerCase().replace(/\s+/g, '-') 
                                        })} 
                                        className="text-xl font-bold text-gray-200 dark:text-white"
                                    >
                                        {astuce.user.name}
                                    </Link>
                                    <p className="text-base text-gray-400 dark:text-gray-400">
                                        {formatDistanceToNow(new Date(astuce.created_at), { 
                                            addSuffix: true, 
                                            locale: fr 
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-200 lg:mb-6 lg:text-4xl dark:text-white">
                            {astuce.titre}
                        </h1>
                    </header>
                    
                    {/* Image de l'astuce */}
                    {astuce.image && (
                        <figure className="mb-6">
                            <img 
src={`${window.location.origin}/storage/${astuce.image}`}

                                alt={astuce.titre} 
                                className="w-full rounded-lg"
                            />
                        </figure>
                    )}
                    
                    {/* Contenu de l'astuce */}
                    <div 
                        className="text-white text-lg mb-6" 
                        dangerouslySetInnerHTML={{ __html: astuce.contenus }}
                    />
                    
                    {/* Code source */}
                    {astuce.codesource && (
                        <pre className={`border border-gray-700 mt-5 rounded-lg overflow-hidden ${languageClass}`}>
                            <code className={languageClass}>
                                {astuce.codesource}
                            </code>
                        </pre>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-col space-y-4 mb-6">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-slate-400">Tags:</span>
                            {astuce.tags.map(tag => (
                                tag.status === false && (
                                    <span 
                                        key={tag.id}
                                        className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-500/20"
                                    >
                                        {tag.nom}
                                    </span>
                                )
                            ))}
                        </div>
                    </div>
                    
                   
                </article>
            </div>
            
            {/* Modal utilisateur */}
            <dialog id="userModal" className="modal backdrop-blur-xl">
                <div className="modal-box max-w-md bg-gradient-to-br from-violet-950/90 to-indigo-950/90 rounded-2xl shadow-2xl border border-violet-500/20">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-violet-300 hover:text-white bg-violet-800/30 hover:bg-violet-700/50">
                            ✕
                        </button>
                    </form>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-pink-200">
                        Profil utilisateur
                    </h3>
                    <div className="p-6 space-y-6 bg-gradient-to-br from-violet-900/50 to-indigo-900/50 rounded-2xl backdrop-blur-md">
                        <div className="backdrop-filter backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-violet-500/20 shadow-lg">
                            <div className="flex items-center space-x-6">
                                <div className="flex-shrink-0 relative group">
                                    {astuce.user.image ? (
                                        <img 
                                            className="h-24 w-24 rounded-full object-cover ring-4 ring-violet-400/50 shadow-lg group-hover:scale-105 transition-all duration-300" 
                                            src={`${window.location.origin}/storage/${astuce.user.image}`}

                                            alt={astuce.user.name}
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-pink-200">
                                        {astuce.user.name}
                                    </h3>
                                    
                                    <p className="text-violet-200 font-medium">
                                        Membre  {' '}
                                        <span className="text-pink-200 font-semibold">
                                            {formatDistanceToNow(new Date(astuce.user.created_at), { 
                                                addSuffix: true, 
                                                locale: fr 
                                            })}
                                        </span>
                                    </p>
                                    
                                    <Link 
                                        
                                    href={route('users.show', {user: `${astuce.user.name.toLowerCase().replace(/\s+/g, '-')}-${astuce.user.id}`})}

                                        className="inline-block px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-violet-500/50"
                                    >
                                        Voir le profil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </AuthenticatedLayout>
    );
}