// resources/js/Components/NewsletterSubscription.jsx
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function NewsletterSubscription() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        email: '',
        nom: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('newsletter.store'));
    };

    return (
        <div className="bg-base-200 p-6 rounded-lg z-90000">
            <h3 className="text-lg font-bold mb-4">Abonnez-vous à notre newsletter</h3>
            
            {recentlySuccessful && (
                <div className="alert alert-success mb-4">
                    Merci pour votre inscription ! Veuillez vérifier votre email.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="nom" className="block mb-1">Nom (optionnel)</label>
                    <input
                        id="nom"
                        type="text"
                        value={data.nom}
                        onChange={(e) => setData('nom', e.target.value)}
                        className="input input-bordered w-full"
                    />
                    {errors.nom && <p className="text-error text-sm mt-1">{errors.nom}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block mb-1">Email *</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                    {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={processing}
                >
                    {processing ? 'En cours...' : "S'abonner"}
                </button>
            </form>
        </div>
    );
}