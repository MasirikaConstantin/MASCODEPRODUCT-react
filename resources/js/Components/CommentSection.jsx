import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import CommentForm from './CommentForm';

export default function CommentSection({ post }) {
    const { auth } = usePage().props;
    const [comments, setComments] = useState(post.comments?.data || []);
    const [replyingTo, setReplyingTo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(post.comments?.last_page || 1);

    // Ajoute un nouveau commentaire à la liste
    const handleNewComment = (newComment) => {
        if (newComment.parent_id) {
            // Trouver le commentaire parent et ajouter la réponse
            const addReplyToComment = (commentsList) => {
                return commentsList.map(comment => {
                    if (comment.id === newComment.parent_id) {
                        return {
                            ...comment,
                            replies: [...(comment.replies || []), newComment],
                            replies_count: (comment.replies_count || 0) + 1
                        };
                    }
                    
                    // Vérifier les réponses imbriquées
                    if (comment.replies?.length) {
                        return {
                            ...comment,
                            replies: addReplyToComment(comment.replies)
                        };
                    }
                    
                    return comment;
                });
            };
            
            setComments(addReplyToComment(comments));
        } else {
            // Nouveau commentaire principal - ajout en haut de la liste
            setComments(prev => [newComment, ...prev]);
        }
        setReplyingTo(null);
    };

    // Charge une page spécifique de commentaires
    const loadPage = (page) => {
        if (page < 1 || page > totalPages) return;
        
        router.get(route('posts.show', { nom: post.slug, page }), {}, {
            preserveState: true,
            only: ['post'],
            onSuccess: (page) => {
                setComments(page.props.post.comments.data);
                setCurrentPage(page.props.post.comments.current_page);
                setTotalPages(page.props.post.comments.last_page);
            }
        });
    };

    return (
        <div className="mt-12" id="comments-section">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                    Commentaires ({post.comments_count || 0})
                </h2>
            </div>

            {/* Formulaire de commentaire principal */}
            {auth.user && (
                <CommentForm 
                    postId={post.id} 
                    onSuccess={handleNewComment}
                    className="mb-8"
                />
            )}

            {/* Liste des commentaires */}
            <div className="space-y-6">
                {comments.map(comment => (
                    <CommentItem 
                        key={comment.id}
                        comment={comment}
                        postId={post.id}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                        onReplyAdded={handleNewComment}
                        currentUserId={auth.user?.id}
                        depth={0}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="join">
                        <button 
                            onClick={() => loadPage(1)} 
                            disabled={currentPage === 1}
                            className="join-item btn btn-sm"
                        >
                            «
                        </button>
                        <button 
                            onClick={() => loadPage(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className="join-item btn btn-sm"
                        >
                            ‹
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => loadPage(pageNum)}
                                    disabled={pageNum === currentPage}
                                    className={`join-item btn btn-sm ${pageNum === currentPage ? 'btn-active' : ''}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        
                        <button 
                            onClick={() => loadPage(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                            className="join-item btn btn-sm"
                        >
                            ›
                        </button>
                        <button 
                            onClick={() => loadPage(totalPages)} 
                            disabled={currentPage === totalPages}
                            className="join-item btn btn-sm"
                        >
                            »
                        </button>
                    </div>
                </div>
            )}

            {comments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    Soyez le premier à commenter !
                </div>
            )}
        </div>
    );
}

function CommentItem({ comment, postId, replyingTo, setReplyingTo, onReplyAdded, currentUserId, depth }) {
    const [showReplies, setShowReplies] = useState(depth < 2); // Affiche automatiquement les 2 premiers niveaux
    const [localReplies, setLocalReplies] = useState(comment.replies || []);
    const [localRepliesCount, setLocalRepliesCount] = useState(comment.replies_count || 0);

    // Gestion des réponses imbriquées
    const handleReplyAdded = (newReply) => {
        setLocalReplies(prev => [...prev, newReply]);
        setLocalRepliesCount(prev => prev + 1);
        setShowReplies(true);
        onReplyAdded(newReply);
    };

    // Toggle pour afficher/masquer les réponses
    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className={`border-l-2 pl-4 ${depth > 0 ? 'border-gray-200 ml-6' : 'border-primary'}`}>
            <div className="flex gap-3">
                <div className="avatar">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {comment.user.avatar_url ? (
                            <img src={comment.user.avatar_url} alt={comment.user.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-600 font-medium">
                                {comment.user.name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <div className="font-semibold">{comment.user.name}</div>
                        <div className="text-xs text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                    
                    <div className="mt-1 whitespace-pre-line">{comment.contenus}</div>
                    
                    <div className="mt-2 flex gap-3 items-center">
                        {currentUserId && (
                            <button 
                                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                className="text-sm text-primary hover:underline"
                            >
                                {replyingTo === comment.id ? 'Annuler' : 'Répondre'}
                            </button>
                        )}
                        
                        {localRepliesCount > 0 && (
                            <button 
                                onClick={toggleReplies}
                                className="text-sm text-gray-500 hover:underline"
                            >
                                {showReplies ? 'Masquer les réponses' : `Afficher ${localRepliesCount} réponse${localRepliesCount > 1 ? 's' : ''}`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Formulaire de réponse */}
            {replyingTo === comment.id && (
                <div className="mt-4 ml-4">
                    <CommentForm 
                        postId={postId} 
                        parentId={comment.id}
                        onSuccess={handleReplyAdded}
                        onCancel={() => setReplyingTo(null)}
                    />
                </div>
            )}

            {/* Réponses imbriquées */}
            {showReplies && localReplies.length > 0 && (
                <div className="mt-4 space-y-4">
                    {localReplies.map(reply => (
                        <CommentItem 
                            key={reply.id}
                            comment={reply}
                            postId={postId}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            onReplyAdded={handleReplyAdded}
                            currentUserId={currentUserId}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}