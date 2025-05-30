import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function CommentFormAstuces({ astuceId, parentId = null, onCancelReply = null }) {
    const { auth } = usePage().props;
    const { props } = usePage();

    const flash = props.flash || {}; // Solution pour éviter l'erreur si flash est undefined

    const { data, setData, post, processing, errors, reset } = useForm({
        contenus: '',
        astuce_id: astuceId,
        parent_id: parentId
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('commentairesastuces.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('contenus');
                toast.success('Commentaire envoyé avec succes')
                if (onCancelReply) onCancelReply();
            },
            onError: () => {
                // Scroll vers les erreurs si nécessaire
                const errorElement = document.querySelector('.text-error');
                if (errorElement) {
                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    };

    if (!auth.user) {
        return (
            <div className="mt-8">
                <div className="alert alert-warning">
                    <div>
                        <span>Vous devez être connecté pour commenter</span>
                        <Link href={route('login')} className="link link-primary ml-2">
                            Se connecter
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8" id="comment-form">
            {flash.success && (
                <div className="alert alert-success mb-4">
                    <div>
                        <span>{flash.success}</span>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-semibold mb-4 text-base-content">
                {parentId ? 'Répondre au commentaire' : 'Laisser un commentaire'}
            </h3>
            
            <form onSubmit={submit} className="space-y-4">
                <div className="form-control">
                    <textarea
                        className={`textarea textarea-bordered h-24 ${errors.contenus ? 'textarea-error' : ''}`}
                        placeholder="Votre commentaire..."
                        value={data.contenus}
                        onChange={(e) => setData('contenus', e.target.value)}
                        disabled={processing}
                    />
                    {errors.contenus && (
                        <span className="text-error text-sm mt-1 block">
                            {errors.contenus}
                        </span>
                    )}
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        type="submit" 
                        className={`btn btn-primary ${processing ? 'loading' : ''}`}
                        disabled={processing}
                    >
                        {processing ? '' : parentId ? 'Publier la réponse' : 'Publier le commentaire'}
                    </button>

                    {parentId && (
                        <button 
                            type="button" 
                            className="btn btn-ghost"
                            onClick={onCancelReply}
                            disabled={processing}
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}