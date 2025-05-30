import { useForm, usePage } from '@inertiajs/react';
import React from 'react';

export default function LikeButton({ likeableId, likeableType, initialLikes, initialIsLiked }) {
    const { post } = useForm({
        likeable_id: likeableId,
        likeable_type: likeableType,
    });
    
    const [isLiked, setIsLiked] = React.useState(initialIsLiked);
    const [likesCount, setLikesCount] = React.useState(initialLikes);
    
    const toggleLike = () => {
        post('/likes/toggle', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLiked(!isLiked);
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
            }
        });
    };
    
    return (
        <button 
            onClick={toggleLike}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{likesCount}</span>
        </button>
    );
}