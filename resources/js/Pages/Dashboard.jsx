import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import PostCard from '@/Components/PostCard';
import AstuceCard from '@/Components/AstuceCard';
import SavedPostCard from '@/Components/SavedPostCard';
import SavedItemCard from '@/Components/SavedItemCard';

export default function Dashboard() {
    const { 
        posts, 
        drafts, 
        astuces, 
        savedItems, 
        user, 
        stats 
    } = usePage().props;
    
    const [activeTab, setActiveTab] = useState('drafts');
    const [showCreateModal, setShowCreateModal] = useState(false);
    
    const tabs = [
        { id: 'drafts', label: 'Brouillons' },
        { id: 'posts', label: 'Mes Posts' },
        { id: 'astuces', label: 'Mes Astuces' },
        { id: 'saved', label: 'Enregistrements' }
    ];
    
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            
            <div className="container mx-auto px-4 py-8 ">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-primary">Posts</h3>
                            <p className="text-4xl font-bold">{stats.postsCount}</p>
                        </div>
                    </div>
                    
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-secondary">Abonnés</h3>
                            <p className="text-4xl font-bold">{stats.subscribersCount}</p>
                        </div>
                    </div>
                    
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-accent">Vues</h3>
                            <p className="text-4xl font-bold">{stats.viewsCount}</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-200 shadow-xl">
                            <figure className="px-10 pt-10">
                                <div className="avatar">
                                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center overflow-hidden">
                                    {user.image ? (
                                        <img 
                                            src={`${window.location.origin}/storage/${user.image}`}

                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <svg 
                                                className="w-16 h-16 text-gray-500" 
                                                aria-hidden="true" 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    fillRule="evenodd" 
                                                    d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" 
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                </div>
                            </figure>
                            
                            <div className="card-body">
                                <h2 className="card-title">{user.name}</h2>
                                <p className="text-gray-500">{user.email}</p>
                                
                                <div className="stats stats-vertical shadow">
                                    <div className="stat">
                                        <div className="stat-title">Posts</div>
                                        <div className="stat-value">{stats.postsCount}</div>
                                    </div>
                                    
                                    <div className="stat">
                                        <div className="stat-title">Abonnés</div>
                                        <div className="stat-value">{stats.subscribersCount}</div>
                                    </div>
                                </div>
                                
                                <div className="card-actions justify-center mt-4">
                                    <Link 
                                        href={route('mon.profile.edit')} 
                                        className="btn btn-primary"
                                    >
                                        Modifier le profil
                                    </Link>
                                    
                                    <div className="dropdown dropdown-top">
                                        <div 
                                            tabIndex={0} 
                                            role="button" 
                                            className="btn btn-secondary"
                                        >
                                            Créer
                                        </div>
                                        <ul 
                                            tabIndex={0} 
                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                        >
                                            <li>
                                                <Link href={route('astuces.create')}>Astuce</Link>
                                            </li>
                                            <li>
                                                <Link href={route('posts.newpost')}>Post</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        {/* Tabs */}
                        <div className="tabs tabs-boxed bg-base-200 mb-6 rounded-lg">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        
                        {/* Tab Content */}
                        <div className="space-y-6">
                            {/* Drafts Tab */}
                            {activeTab === 'drafts' && (
                                <div>
                                    {drafts.data.length > 0 ? (
                                        <div className="space-y-4 ">
                                            {drafts.data.map(post => (
                                                <PostCard 
                                                    key={post.id} 
                                                    post={post} 
                                                    type="draft"
                                                />
                                            ))}
                                            
                                            <Pagination links={drafts.links} />
                                        </div>
                                    ) : (
                                        <div className="alert alert-info shadow-lg">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span>Aucun brouillon pour le moment</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {/* Posts Tab */}
                            {activeTab === 'posts' && (
                                <div>
                                    {posts.data.length > 0 ? (
                                        <div className="space-y-4">
                                            {posts.data.map(post => (
                                                <PostCard 
                                                    key={post.id} 
                                                    post={post} 
                                                    type="post"
                                                />
                                            ))}
                                            
                                            <Pagination links={posts.links} />
                                        </div>
                                    ) : (
                                        <div className="alert alert-info shadow-lg">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span>Aucun post publié pour le moment</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {/* Astuces Tab */}
                            {activeTab === 'astuces' && (
                                <div>
                                    {astuces.data.length > 0 ? (
                                        <div className="space-y-4">
                                            {astuces.data.map(astuce => (
                                                <AstuceCard 
                                                    key={astuce.id} 
                                                    astuce={astuce}
                                                />
                                            ))}
                                            
                                            <Pagination links={astuces.links} />
                                        </div>
                                    ) : (
                                        <div className="alert alert-info shadow-lg">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span>Aucune astuce pour le moment</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {/* Saved Tab */}
                            {activeTab === 'saved' && (
                                <div>
                                    {savedItems.length === 0 ? (
                                            <div className="alert alert-info shadow-lg">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span>Aucun post enregistré pour le moment</span>
                                            </div>
                                            </div>                                    ) : (
                                        <div className="grid gap-4">
                                            {savedItems.map(item => (
                                                <SavedItemCard 
                                                    key={`${item.type}-${item.id}`} 
                                                    item={item} 
                                                />
                                            ))}
                                        </div>
                                    )}
                                   
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Create Modal */}
            {showCreateModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Créer un nouveau contenu</h3>
                        <p className="py-4">Choisissez le type de contenu à créer :</p>
                        
                        <div className="modal-action">
                            <Link 
                                href={route('astuces.create')} 
                                className="btn btn-primary"
                            >
                                Astuce
                            </Link>
                            
                            <Link 
                                href={route('user.newpost')} 
                                className="btn btn-secondary"
                            >
                                Post
                            </Link>
                            
                            <button 
                                className="btn"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

// Composant PostCard

// Composant AstuceCard


// Composant SavedPostCard
