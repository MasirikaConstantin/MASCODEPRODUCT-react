import { Link, useForm } from '@inertiajs/react';

export default function SavedItemCard({ item }) {
    const { delete: destroy } = useForm();
    
    const handleRemove = (e) => {
        e.preventDefault();
        destroy(route('bookmarks.destroy', item.bookmark_id));
    };

    // Détermine la route en fonction du type
    const getRoute = () => {
        switch(item.type) {
            case 'Post':
                return route('posts.show', { post: item.slug });
            case 'Astuce':
                return route('astuces.show', { astuce: item.slug });
            default:
                return '#';
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
                <h2 className="card-title">
                    <Link 
                        href={getRoute()}
                        className="hover:text-primary"
                    >
                        {item.titre}
                    </Link>
                    <span className="badge badge-info ml-2">{item.type}</span>
                </h2>
                
                <p className="line-clamp-2">{item.contenu}</p>
                
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                        {item.type === 'Post' ? 'Posté' : 'Publié'} par {item.user.name}
                    </span>
                    
                    <button 
                        onClick={handleRemove}
                        className="btn btn-sm btn-error"
                    >
                        Retirer
                    </button>
                </div>
            </div>
        </div>
    );
}