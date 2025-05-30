import { Link, router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function AstuceCard({ astuce }) {
    const handleDelete = (astuce) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette astuce ? Cette action est irréversible.')) {
          router.delete(`/astuces/${astuce.id}`, {
            preserveScroll: true,
            onSuccess: () => {
              // Notification de succès
              toast.success('Astuce supprimée avec succès');
              
              // Si vous avez besoin de rafraîchir des données
              // router.reload({ only: ['astuces'] });
            },
            onError: () => {
              toast.error('Une erreur est survenue lors de la suppression');
            },
          });
        }
    }
    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    <Link 
                        href={route('astuces.previsualiser', { astuce: astuce.slug })}
                        className="hover:text-primary"
                    >
                        {astuce.titre}
                    </Link>
                    
                    {astuce.etat && (
                        <div className="badge badge-warning text-xs">En attente</div>
                    )}
                </h2>
                
                <div 
                    className="prose max-w-none line-clamp-3" 
                    dangerouslySetInnerHTML={{ __html: astuce.contenus }}
                />
                
                <div className="card-actions justify-end mt-4">
                    <Link 
                        href={route('astuces.edit',  astuce.slug )}

                        className="btn btn-sm btn-outline"
                    >
                        Modifier
                    </Link>
                    <button
                                        onClick={() => handleDelete(astuce)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Supprimer
                                    </button>
                    <Link 
                        href={route('astuces.previsualiser', { astuce: astuce.slug })}
                        className="btn btn-sm btn-primary"
                    >
                        Prévisualiser
                    </Link>
                </div>
            </div>
        </div>
    );
}