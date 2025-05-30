import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import LikeButton from './LikeButton';

export default function Comment({ comment, auth, postId }) {
    // Utilisez le postId passé en prop OU celui du commentaire
    const actualPostId = postId || comment.post_id;
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        contenus: '',
        parent_id: comment.id??"",
        post_id: postId || comment.post_id,
    });

    const handleReplySubmit = (e) => {
        e.preventDefault();
        post(route('comments.store', { post: actualPostId }), {
            preserveScroll: true,
            onSuccess: (response) => {
                reset('contenus');
                setShowReplyForm(false);
                setShowReplies(true);
                
                // Mise à jour locale du commentaire avec la nouvelle réponse
                if (response.props.comment) {
                    comment.replies = [...(comment.replies || []), response.props.comment];
                    comment.replies_count = (comment.replies_count || 0) + 1;
                }
            },
        });
    };

    return (
        <div className="pb-4 last:pb-0 mt-4">
            <div className="flex gap-3">
                <Link 
                    href={route('users.show', {user: `${comment.user.name.toLowerCase().replace(/\s+/g, '-')}-${comment.user.id}`})}

                    className="flex-shrink-0"
                >
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img 
                                src={comment.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}`} 
                                alt={comment.user.name}
                            />
                            {comment.user.image && (
                                    <figure className="mb-6 rounded-lg overflow-hidden">
                                        <img 
                                            src={comment.user.image} 
                                            alt={comment.title} 
                                            className="w-full h-auto max-h-[32rem] object-cover"
                                        />
                                    </figure>
                                )}
                        </div>
                    </div>
                </Link>
                
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Link 
                    href={route('users.show', {user: `${comment.user.name.toLowerCase().replace(/\s+/g, '-')}-${comment.user.id}`})}
                    className="font-semibold hover:text-primary hover:underline"
                        >
                            {comment.user.name}
                        </Link>
                        <span className="text-sm opacity-70">{comment.created_at}</span>
                    </div>
                    
                    <p className="mt-1">{comment.contenus}</p>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm">
                    <LikeButton         
                                            likeableId={comment.id}
                                            likeableType="App\Models\Commentaire"
                                            initialLikes={comment.stats.likes_count}
                                            initialIsLiked={comment.has_liked}
                                        />
                        
                        {comment.replies && comment.replies.length > 0 && (
                            <button 
                                onClick={() => setShowReplies(!showReplies)}
                                className="flex items-center gap-1 hover:text-primary"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <span>{comment.replies_count || comment.replies.length} réponses</span>
                            </button>
                        )} 
                        
                        {auth.user && (
                            <button 
                                onClick={() => setShowReplyForm(!showReplyForm)}
                                className="hover:text-primary hover:underline"
                            >
                                Répondre
                            </button>
                        )}
                    </div>

                    {showReplyForm && auth.user && (
                        <form className="mt-4 flex gap-3" onSubmit={handleReplySubmit}>
                            <div className="avatar flex-shrink-0">
                                <div className="w-8 rounded-full">
                                    <img 
                                        src={auth.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}`} 
                                        alt={auth.user.name}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    name="contenus"
                                    value={data.contenus}
                                    onChange={(e) => setData('contenus', e.target.value)}
                                    placeholder="Écrire une réponse..."
                                    className="input input-bordered input-sm w-full"
                                    required
                                />
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-sm"
                                    disabled={processing}
                                >
                                    {processing ? 'Envoi...' : 'Envoyer'}
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {/* Affichage récursif des réponses */}
                    {showReplies && comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-base-200 space-y-3">
                            {comment.replies.map((reply) => (
                                <Comment 
                                    key={reply.id} 
                                    comment={reply} 
                                    auth={auth} 
                                    postId={actualPostId} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}