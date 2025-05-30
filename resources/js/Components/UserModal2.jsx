import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function UserModal({ user, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-md bg-gradient-to-br from-violet-950 to-indigo-950 border border-violet-500/20">
                <div className="flex justify-between items-center p-4 border-b border-violet-600/30 bg-violet-900/30">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-pink-200">
                        Profil utilisateur
                    </h3>
                    <button onClick={onClose} className="btn btn-circle btn-ghost btn-sm">
                        ✕
                    </button>
                </div>

                <div className="p-6 bg-gradient-to-br from-violet-900/50 to-indigo-900/50">
                    <div className="bg-white/5 rounded-box p-6 border border-violet-500/20">
                        <div className="flex items-center gap-6">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-violet-400/50">
                                    {user.image ? (
                                        <img src={user.image_url} alt={user.name} />
                                    ) : (
                                        <img src="/téléchargement.png" alt="Default" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-pink-200">
                                    {user.name}
                                </h3>

                                <p className="text-violet-200">
                                    Membre depuis <span className="text-pink-200">{new Date(user.created_at).toLocaleDateString()}</span>
                                </p>

                                <p className="text-violet-300/90 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                    {user.subscribers_count} abonnés
                                </p>

                                <Link 
                                    href={route('user.profil', { user: user.id, nom: user.slug })}
                                    className="btn btn-primary"
                                >
                                    Voir le profil
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}