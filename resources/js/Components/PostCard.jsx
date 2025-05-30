import { Link, router } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function PostCard({ post, type }) {
    const { put,get } = useForm();


const publishPost = () => {
    router.put(route('posts.update-status', post.id), {
        etat: 1
    }, {
        onSuccess: () => {
            toast.success('Statut mis à jour !');
        },
        onError: (errors) => {
            // Optionnel: Gestion des erreurs
        }
    });
};
const handleDelete = (post) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet post ? Cette action est irréversible.')) {
      router.delete(`/post/${post.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          // Notification de succès
          toast.success('Post supprimée avec succès');
          
          // Si vous avez besoin de rafraîchir des données
          // router.reload({ only: ['astuces'] });
        },
        onError: () => {
          toast.error('Une erreur est survenue lors de la suppression');
        },
      });
    }}

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-start">
                    <h2 className="card-title">
                        <Link 
                                                        href={route('posts.show', post.slug)}

                            className="hover:text-primary"
                        >
                            {post.titre}
                        </Link>
                        
                        {type === 'draft' && (
                            <div className="badge badge-warning">Brouillon</div>
                        )}
                    </h2>
                    
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                            {post.duration}
                        </span>
                    </div>
                </div>
                
                <p className="line-clamp-2">{post.contenus}</p>
                
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map(tag => (
                            <span key={tag.id} className="badge badge-outline">
                                {tag.nom}
                            </span>
                        ))}
                    </div>
                )}
                
                <div className="card-actions justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                            {post.views_count} vue{post.views_count !== 1 ? 's' : ''}
                        </span>
                    </div>
                    
                    <div className="flex space-x-2">
                        {type === 'draft' && (
                            <button 
                                onClick={publishPost}
                                className="btn btn-sm btn-success"
                            >
                                Mettre en ligne
                            </button>
                        )}
                        <button
                                        onClick={() => handleDelete(post)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Supprimer
                                    </button>
                        <Link 
                            href={route('posts.edit',  post.slug )}
                            className="btn btn-sm btn-outline"
                        >
                            Modifier
                        </Link>
                        
                        <Link 
                            href={route('posts.show', post.slug)}
                            className="btn btn-sm btn-primary"
                        >
                            Voir
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}