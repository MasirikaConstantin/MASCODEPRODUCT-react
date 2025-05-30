import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react';

export default function BookmarkButton({ bookmarkableId, bookmarkableType, initialIsBookmarked }) {
    const { post, processing, errors } = useForm({
        bookmarkable_id: bookmarkableId,
        bookmarkable_type: bookmarkableType,
    });
    const { flash } = usePage().props;
    const [isBookmarked, setIsBookmarked] = React.useState(initialIsBookmarked);
    
    const toggleBookmark = () => {
        post('/bookmarks/toggle', {
            preserveScroll: true,
            onSuccess: () => {
                setIsBookmarked(!isBookmarked);
                // Le message flash sera géré côté backend
            },
            onError: (errors) => {
                console.error('Erreur:', errors);
            }
        });
    };

    return (
        <button 
            onClick={toggleBookmark}
            disabled={processing}
            className={`btn btn-xs ${isBookmarked ? 'btn-error' : 'btn-primary'}`}
        >
            <FontAwesomeIcon icon={faBookmark} />
            {processing ? 'Chargement...' : isBookmarked ? 'Retirer' : 'Sauvegarder'}
        </button>
    );
}