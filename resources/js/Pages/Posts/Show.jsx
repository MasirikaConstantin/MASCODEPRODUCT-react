import BookmarkButton from '@/Components/BookmarkButton';
import Comment from '@/Components/Comment';
import CommentForm from '@/Components/CommentForm';
import LikeButton from '@/Components/LikeButton';
import PrismCode from '@/Components/PrismCode';
import QuillContentViewer from '@/Components/QuillContentViewer';
import Layout from '@/Layouts/Base';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PostShow({ post, categories }) {
    const [showAllComments, setShowAllComments] = useState(false);
    const { auth } = usePage().props;
    const displayedComments = showAllComments 
        ? post.comments 
        : post.comments.slice(0, 3);
    
    const getCodeClass = (category) => {
        const categoryName = typeof category === 'object' 
            ? category.titre 
            : category;
        
        const normalized = String(categoryName)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-');
        
        return `language-${normalized}`;
    };

    const codeClass = getCodeClass({ id: post.categorie.id, titre: post.categorie.titre });

    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.meta} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.meta} />
                <meta property="og:image" content={post.image || `https://autres.mascodeproduct.com/mas-product.ico`} />
                <meta property="og:url" content={route('posts.show', post.slug)} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.meta} />
                <meta name="twitter:image" content={post.image || `https://autres.mascodeproduct.com/mas-product.ico`} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div className="container mx-auto  sm:px-4 py-4 sm:py-6">
                <div className="flex flex-col lg:flex-row gap-2 sm:gap-6">
                    {/* Contenu principal - Augmentation de l'espacement */}
                    <div className="lg:w-2/3">
                        <article className="card shadow-sm sm:shadow-md p-4 sm:p-6 mb-6 sm:mb-8 bg-base-200">
                            <header className="mb-4 sm:mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
                                    <Link 
                                        href={route('users.show', {user: `${post.author.name.toLowerCase().replace(/\s+/g, '-')}-${post.author.id}`})}
                                        className="flex items-center gap-2 sm:gap-3 group"
                                    >
                                        <div className="avatar">
                                            <div className="w-10 sm:w-12 rounded-full">
                                                <img 
                                                    src={post.author.image || `https://ui-avatars.com/api/?name=${post.author.name}`} 
                                                    alt={post.author.name}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm sm:text-base group-hover:text-primary transition">
                                                {post.author.name}
                                            </p>
                                            <time 
                                                dateTime={post.published_at.datetime}
                                                className="text-xs sm:text-sm text-gray-500"
                                            >
                                                {post.published_at.formatted}
                                            </time>
                                        </div>
                                    </Link>
                                    
                                    <div className="flex flex-wrap gap-1 sm:gap-2 justify-end">
                                        {post.tags?.map(tag => (
                                            <Link 
                                                key={tag.id}
                                                className="badge badge-outline text-xs hover:badge-primary transition"
                                            >
                                                #{tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">{post.title}</h1>
                            </header>

                            {post.image && (
                                <figure className="mb-4 sm:mb-6 rounded-lg overflow-hidden">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-auto max-h-[20rem] sm:max-h-[32rem] object-cover"
                                    />
                                </figure>
                            )}

                            {post.video_url && (
                                <div className="aspect-w-16 aspect-h-9 mb-4 sm:mb-6">
                                    <iframe 
                                        src={post.video_url} 
                                        className="w-full h-[16rem] sm:h-[24rem] md:h-[32rem] rounded-lg"
                                        allowFullScreen
                                    />
                                </div>
                            )}

                            <div className=" ">
                                <QuillContentViewer content={post.contenus} />
                            </div>

                            {post.codesource && (
                                <div className="mb-6 sm:mb-8">
                                    <PrismCode code={post.codesource} language={codeClass} />
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-b border-base-300 py-3 sm:py-4 my-4 sm:my-6 gap-3 sm:gap-0">
                                <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start">
                                    <LikeButton 
                                        likeableId={post.id}
                                        likeableType="App\Models\Post"
                                        initialLikes={post.stats.likes_count}
                                        initialIsLiked={post.has_liked}
                                    />
                                    {auth.user && (
                                        <BookmarkButton 
                                            bookmarkableId={post.id}
                                            bookmarkableType="App\Models\Post"
                                            initialIsBookmarked={post.is_bookmarked}
                                        />
                                    )}
                                    
                                    <button className="btn btn-ghost btn-xs sm:btn-sm gap-1 sm:gap-2 px-2 sm:px-3">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span>{post.stats.comments_count}</span>
                                    </button>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {post.tags?.map((tag) => {
                                                const colorClasses = [
                                                    'badge-primary',
                                                    'badge-secondary',
                                                    'badge-accent',
                                                    'badge-info',
                                                    'badge-success',
                                                    'badge-warning',
                                                    'badge-error',
                                                    'badge-ghost'
                                                ];
                                                const colorIndex = Math.abs(
                                                    tag.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
                                                ) % colorClasses.length;
                                                
                                                return (
                                                    <Link 
                                                        key={tag.id}
                                                        className={`badge text-xs ${colorClasses[colorIndex]} hover:opacity-80 transition-opacity`}
                                                    >
                                                        {tag.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs sm:text-sm mt-2 sm:mt-0">
                                    <div className={`badge me-1 sm:me-2 badge-${post.categorie.couleur} text-xs`}>
                                        {post.categorie.titre}
                                    </div>
                                    {post.stats.views_count} vues
                                </div>
                            </div>
                        </article>

                        {/* Section commentaires - Espacement amélioré */}
                        <section className="card bg-base-200 shadow-sm sm:shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Commentaires ({post.all_comments_count})</h2>
                            
                            {auth.user ? (
                                <CommentForm postId={post.id} className="mb-4 sm:mb-6" />
                            ) : (
                                <div className="relative mb-4 h-12">
                                    <textarea
                                        type="text"
                                        readOnly
                                        defaultValue="Connectez-vous pour commenter"
                                        className="textarea textarea-bordered w-full p-3 pr-16 rounded-lg resize-none transition-all absolute top-0 left-0 text-xs sm:text-sm"
                                        rows="2"
                                    />
                                </div>
                            )}
                            
                            <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                                {displayedComments?.map(comment => (
                                    <Comment 
                                        key={comment.id}
                                        comment={comment}
                                        auth={auth}
                                    />
                                ))}
                            </div>
                            
                            {post.all_comments_count > 3 && !showAllComments && (
                                <button 
                                    onClick={() => setShowAllComments(true)}
                                    className="btn btn-link btn-sm sm:btn-md mt-3 sm:mt-4 px-0 text-xs sm:text-sm"
                                >
                                    Voir tous les commentaires ({post.all_comments_count})
                                </button>
                            )}
                        </section>
                    </div>
                    
                    {/* Sidebar - Optimisé pour mobile */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-2 sm:top-4 space-y-4 sm:space-y-6">
                            {post.related_posts.length > 0 && (
                                <div className="card bg-base-200 shadow-sm sm:shadow-md p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Articles similaires</h3>
                                    <div className="space-y-3 sm:space-y-4">
                                        {post.related_posts?.map(related => (
                                            <Link 
                                                key={related.id}
                                                href={route('posts.show', related.slug)}
                                                className="block group"
                                            >
                                                <div className="flex gap-2 sm:gap-3">
                                                    {related.image ? (
                                                        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded overflow-hidden">
                                                            <img 
                                                                src={related.image} 
                                                                alt={related.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ):(
                                                        <div className="avatar avatar-placeholder">
                                                            <div className="bg-primary text-primary-content w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center">
                                                                <span className="text-xs sm:text-sm">{related.title.substring(0, 2)}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-sm sm:text-base group-hover:text-primary transition line-clamp-2">
                                                            {related.title}
                                                        </h4>
                                                        <div className="flex items-center gap-1 sm:gap-2 mt-1">
                                                            <div className="avatar">
                                                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full">
                                                                    <img 
                                                                        src={related.author.image || `https://ui-avatars.com/api/?name=${related.author.name}`} 
                                                                        alt={related.author.name}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <span className="text-xs sm:text-sm text-gray-600 truncate">
                                                                {related.author.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-1 mt-1 flex-wrap">
                                                    {related.tags?.map(tag => (
                                                        <div 
                                                            className="badge badge-xs badge-info"
                                                            key={tag.id}
                                                        >
                                                            #{tag.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Widget auteur */}
                            <div className="card bg-base-200 shadow-sm sm:shadow-md p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">À propos de l'auteur</h3>
                                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                    <div className="avatar">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full">
                                            <img 
                                                src={post.author.image || `https://ui-avatars.com/api/?name=${post.author.name}`} 
                                                alt={post.author.name}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm sm:text-base">{post.author.name}</h4>
                                    </div>
                                </div>
                                {post.author.bio && (
                                    <p className="text-opacity-1 text-xs sm:text-sm">{post.author.bio}</p>
                                )}
                                <Link 
                                    href={route('users.show', {user: `${post.author.name.toLowerCase().replace(/\s+/g, '-')}-${post.author.id}`})}
                                    className="btn btn-outline btn-xs sm:btn-sm mt-3 sm:mt-4"
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