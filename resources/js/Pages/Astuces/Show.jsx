import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/AuthenticatedLayout';
import PrismCode from '@/Components/PrismCode';
import CommentFormAstuces from '@/Components/CommentFormAstuces';
import CommentAstuces from '@/Components/CommentAstuce';
import LikeButton from '@/Components/LikeButton';
import BookmarkButton from '@/Components/BookmarkButton';
import QuillContentViewer from '@/Components/QuillContentViewer';

export default function Show({ astuce }) {
    const [showAllComments, setShowAllComments] = useState(false);
    const { auth } = usePage().props;
    const displayedComments = showAllComments 
        ? astuce.comments 
        : astuce.comments?.slice(0, 3);

    const getCodeClass = (category) => {
        const categoryName = typeof category === 'object' 
            ? category.title 
            : category;
        
        const normalized = String(categoryName)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-');
        
        return `language-${normalized}`;
    };


    const codeClass = getCodeClass(astuce.categorie);

    return (
        <Layout>
            <Head>
                <title>{astuce.title}</title>
                <meta name="description" content={astuce.meta_description || astuce.title} />
            </Head>

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs améliorés */}
                <div className="text-sm breadcrumbs mb-6">
                    <ul>
                        <li><Link href={route('home')}>Accueil</Link></li> 
                        <li><Link href={route('astuces.index')}>Astuces</Link></li>
                        <li className="text-primary font-medium">{astuce.title}</li>
                    </ul>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Contenu principal */}
                    <div className="lg:w-2/3">
                        <article className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <header className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Link 
                                            href={route('users.show', {user: `${astuce.author.name.toLowerCase().replace(/\s+/g, '-')}-${astuce.author.id}`})}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className="avatar">
                                                <div className="w-12 rounded-full">
              {astuce.author.image ? (
                <img
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                src={`${window.location.origin}/storage/${astuce.author.image}`}

                alt={astuce.titre}
              />
              ):(
                    <img src={`https://ui-avatars.com/api/?name=${astuce.author.name}`} 
                                                        alt={astuce.author.name}
                                                    />
              )}

                                                    
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-semibold group-hover:text-primary transition">
                                                    {astuce.author.name}
                                                </p>
                                                <time 
                                                    dateTime={astuce.created_at}
                                                    className="text-sm text-gray-500"
                                                >
                                                    {astuce.created_at}
                                                </time>
                                            </div>
                                        </Link>
                                        
                                        <div className="flex gap-2">
                                            {astuce.tags?.map(tag => (
                                                <Link 
                                                    key={tag.id}
                                                    href={route('astuces.index', {tag: tag.name})}
                                                    className="badge badge-outline hover:badge-primary transition"
                                                >
                                                    #{tag.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <h1 className="text-3xl font-bold mb-4">{astuce.title}</h1>
                                    <div className={`badge badge-lg badge-${astuce.categorie.couleur || 'primary'}`}>
                                        {astuce.categorie.titre}
                                    </div>
                                </header>

                                {astuce.image && (
                                    <figure className="mb-6 rounded-lg overflow-hidden">
                                        <img 
                                            src={astuce.image} 
                                            alt={astuce.title} 
                                            className="w-full h-auto max-h-[32rem] object-cover"
                                        />
                                    </figure>
                                )}

                                {astuce.video && (
                                    <div className="aspect-w-16 aspect-h-9 mb-6">
                                        <iframe 
                                            src={astuce.video.replace('watch?v=', 'embed/')}
                                            className="w-full h-[32rem] rounded-lg"
                                            allowFullScreen
                                        />
                                    </div>
                                )}

                                <div 
                                    className="prose max-w-none mb-8"
                                >
<QuillContentViewer content={astuce.contenus} />
                                </div>


                                {astuce.codesource && (
                                    <PrismCode code={astuce.codesource} language={codeClass} />
                                )}

                                <div className="flex items-center justify-between border-t border-b border-base-300 py-4 my-6">
                                    <div className="flex items-center gap-6">
                                        
                                        
                                        <button className="btn btn-ghost btn-sm gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span>{astuce.comments_count || 0}</span>
                                        </button>
                                        <LikeButton 
                                            likeableId={astuce.id}
                                            likeableType="App\Models\Astuce"
                                            initialLikes={astuce.stats.likes_count}
                                            initialIsLiked={astuce.has_liked}
                                        />
                                {auth.user && (

                                        <BookmarkButton 
                                            bookmarkableId={astuce.id}
                                            bookmarkableType="App\Models\Astuce"
                                            initialIsBookmarked={astuce.is_bookmarked}
                                        />
                                ) }

                                    </div>
                                    
                                    <div className="text-sm">
                                        {astuce.stats.views_count || 0} vues
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Section commentaires */}
                        <section className="card bg-base-100 shadow-xl mt-8">
                            <div className="card-body">
                                <h2 className="text-xl font-bold mb-6">Commentaires ({astuce.comments_count || 0})</h2>
                                
                                {auth.user ? (
                                    <CommentFormAstuces 
                                        astuceId={astuce.id} 
                                        className="mb-6"
                                    />
                                ) : (
                                    <div className="alert alert-info mb-6">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span>Connectez-vous pour astuceer un commentaire</span>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="space-y-6">
                                    {displayedComments?.map(comment => (
                                        <CommentAstuces
                                            key={comment.id}
                                            comment={comment}
                                            auth={auth}
                                        />

                                    ))}
                                </div>
                                
                                {astuce.comments_count > 3 && !showAllComments && (
                                    <button 
                                        onClick={() => setShowAllComments(true)}
                                        className="btn btn-link mt-4"
                                    >
                                        Voir tous les commentaires ({astuce.comments_count})
                                    </button>
                                )}
                            </div>
                        </section>
                    </div>
                    
                    {/* Sidebar avec astuces liées */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-4 space-y-6">
                            {astuce.astucesLiees.length > 0 && (
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h3 className="text-xl font-bold mb-4">Astuces similaires</h3>
                                        <div className="space-y-4">
                                            {astuce.astucesLiees?.map(astuceLiee => (
                                                <Link 
                                                    key={astuceLiee.id}
                                                    href={route('astuces.show', astuceLiee.slug)}
                                                    className="block group"
                                                >
                                                    <div className="flex gap-3">
                                                        {astuceLiee.image ? (
                                                            <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                                                                <img 
                                                                    src={astuceLiee.image} 

                                                                    alt={astuceLiee.title}
                                                                    className="w-full h-full object-cover"
                                                                />

                                                            </div>
                                                        ):(
                                                            <div className="avatar avatar-placeholder">
                                                                <div className="bg-primary text-primary-content w-12 rounded-full">
                                                                    <span>{astuceLiee.title.substring(0, 2)}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h4 className="font-semibold group-hover:text-primary transition">
                                                                {astuceLiee.title}
                                                            </h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div className="avatar">
                                                                    <div className="w-6 rounded-full">
                                                                        <img 
                                                                            src={astuceLiee.author.image || `https://ui-avatars.com/api/?name=${astuceLiee.author.name}`} 
                                                                            alt={astuceLiee.author.name}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <span className="text-sm">
                                                                    {astuceLiee.author.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Widget auteur */}
                            {/* Widget auteur */}
                            <div className="card bg-base-200 shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">À propos de l'auteur</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full">
                                        {astuce.author.image ? (
                                        <img
                                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                        src={`${window.location.origin}/storage/${astuce.author.image}`}

                                        alt={astuce.titre}
                                    />
                                    ):(
                                            <img src={`https://ui-avatars.com/api/?name=${astuce.author.name}`} 
                                                                                alt={astuce.author.name}
                                                                            />
                                    )}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{astuce.author.name}</h4>
                                    </div>
                                </div>
                                {astuce.author.bio && (
                                    <p className="text-opacity-1">{astuce.author.bio}</p>
                                )}
                                <Link 
                                    href={route('users.show', {user: `${astuce.author.name.toLowerCase().replace(/\s+/g, '-')}-${astuce.author.id}`})}

                                    className="btn btn-outline btn-sm mt-4"
                                >
                                    Voir le profil
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}