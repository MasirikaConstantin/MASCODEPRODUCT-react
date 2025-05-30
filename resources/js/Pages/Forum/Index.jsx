import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function ForumIndex({ posts, recents }) {
    return (
        <AuthenticatedLayout>
            <Head title="Forum Actualités" />
            
            {/* Hero Section */}
          

            {/* Recent Updates */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-base-200 rounded-box shadow-lg p-6 border border-base-300">
                    <h2 className="text-xl font-bold mb-6 ">Mises à jour récentes</h2>
                    
                    {recents.map((recent) => (
                        <div key={recent.id} className="flex gap-4 py-4 border-b border-base-300 hover:bg-base-300 rounded-box transition duration-200">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    {recent.user.image ? (
                                        
                                        <img src={recent.user.image_url} alt={recent.user.name} />
                                    ) : (
                                        <div className="bg-blue-100 text-blue-600 flex items-center justify-center h-full">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <Link 
                        href={route('posts.show',  recent.slug )}

                                 className="hover:text-primary transition">
                                    <h3 className="font-semibold text-base-content">{recent.user.name}</h3>
                                    <p className="text-base-content/80 mt-1">{recent.contenus.substring(0, 130)}</p>
                                </Link>
                            </div>
                        </div>
                    ))}

                    <div className="text-right mt-4">
                        <Link href={route('tous')} className="text-primary hover:text-primary-focus font-medium">
                            Voir toutes les publications →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Posts List */}
            {posts.data.map((post, index) => (
                <div key={post.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <div className="bg-base-200 rounded-box shadow-lg overflow-hidden border border-base-300">
                        {/* Post Header */}
                        <div className="p-4 border-b border-base-300">
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        {post.user.image ? (
                                            <img src={post.user.image_url} alt={post.user.name} />
                                        ) : (
                                            <FontAwesomeIcon icon={faUserTie} />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-base-content">{post.titre}</h2>
                                    {post.created_at !== post.updated_at && (
                                        <span className="badge badge-info">
                                            Modifié le {new Date(post.updated_at).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Post Content */}
                        <div className="p-6">
                            <div className="prose text-base-content mb-4" dangerouslySetInnerHTML={{ __html: post.contenus.substring(0, 500) }} />

                            {post.codesource && (
                                <div className="bg-neutral rounded-box p-4 overflow-x-auto">
                                    <pre><code className={`language-${post.category?.language || 'plain'} text-sm`}>
                                        {post.codesource.substring(0, 150)}
                                    </code></pre>
                                </div>
                            )}

                            {post.image && (
                                <div className="mt-4 rounded-box overflow-hidden">
                                    <a
                                        href={post.image_url} 
                                        data-fancybox="gallery"
                                    >
                                        <img 
                                        src={post.image_url} 
                                        alt={post.titre}
                                        className="w-full h-48 object-cover hover:scale-105 transition duration-300" 
                                    />
                                    </a>
                                    
                                </div>
                            )}

                            {/* Tags */}
                            <div className="mt-6 flex flex-wrap gap-2">
                                {post.category && (
                                    <span className="badge badge-primary">
                                        {post.category.titre}
                                    </span>
                                )}

                                {post.tags.map(tag => (
                                    <span key={tag.id} className="badge badge-secondary">
                                        {tag.nom}
                                    </span>
                                ))}
                            </div>

                            {/* Post Footer */}
                            <div className="mt-4 flex items-center justify-between text-sm text-base-content/70">
                                <div className="flex items-center gap-4">
                                    <span>{post.views_count} {post.views_count > 1 ? 'vues' : 'vue'}</span>
                                    <span>Par : <span className="text-base-content">{post.user.name}</span></span>
                                    <span>Publié le : {new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                                <Link 
                                    href={route('posts.show', post.slug )}
                                    className="text-primary hover:text-primary-focus font-medium"
                                >
                                    Lire la suite →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Pagination */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Pagination links={posts.links} />
            </div>
        </AuthenticatedLayout>
    );
}