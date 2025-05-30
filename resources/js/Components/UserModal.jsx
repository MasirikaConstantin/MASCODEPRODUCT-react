import { Link } from '@inertiajs/react';
import React from 'react';

export default function UserModal({ user, show, onClose }) {
    if (!show) return null;
console.log(user)
    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-md relative bg-base-300 text-primary-content">
                <button 
                    onClick={onClose}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                    ✕
                </button>
                
                <h3 className="text-xl font-bold mb-4">Profil utilisateur</h3>
                
                <div className="flex items-center space-x-6">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                            {user.image_url ? (
                                <img src={user.image_url} alt={user.name} />
                            ) : (
                                <div className="w-full h-full bg-neutral flex items-center justify-center">
                                    <svg className="w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <h3 className="text-2xl font-bold">{user.name}</h3>
                        <p className="text-sm">
                            Membre depuis <span className="font-semibold">{new Date(user.created_at).toLocaleDateString()}</span>
                        </p>
                        <p className="text-sm flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                            </svg>
                            {user.subscribers_count} abonnés
                        </p>
                        <Link 
                            href={route('users.show', { 
                                user: `${user.name.toLowerCase().replace(/\s+/g, '-')}-${user.id}`
                            })}
                            className="btn btn-accent btn-sm"
                            >
                            Voir le profil
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}