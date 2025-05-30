import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Listbox } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function EditPost({ post }) {
    const { categories, tags, errors: serverErrors } = usePage().props;
    const [imagePreview, setImagePreview] = useState(post.image ? `/storage/${post.image}` : null);
    const [clientErrors, setClientErrors] = useState({});
    const [hasNewImage, setHasNewImage] = useState(false); // Nouveau state pour tracker si une nouvelle image est ajoutée
    const fileInputRef = useRef(null);

    const { data, setData, post: submitPost, processing } = useForm({
        titre: post.titre,
        contenus: post.contenus,
        user_id: post.user_id,
        image: null,
        slug: post.slug,
        codesource: post.codesource,
        categorie_id: post.categorie_id,
        tags: post.tags.map(tag => tag.id),
        etat: post.etat.toString(),
        _method: 'PUT' // Ajout de la méthode PUT pour Laravel
    });

    // Validation client corrigée
    const validate = () => {
        const errors = {};

        if (!data.titre || !data.titre.trim()) {
            errors.titre = 'Le titre est obligatoire';
        } else if (data.titre.length < 4) {
            errors.titre = 'Le titre doit faire au moins 4 caractères';
        }

        if (!data.contenus || !data.contenus.trim()) {
            errors.contenus = 'Le contenu est obligatoire';
        } else if (data.contenus.length < 4) {
            errors.contenus = 'Le contenu doit faire au moins 4 caractères';
        }

        if (!data.slug || !data.slug.trim()) {
            errors.slug = 'Le slug est obligatoire';
        } else if (data.slug.length < 8) {
            errors.slug = 'Le slug doit faire au moins 8 caractères';
        } else if (!/^[0-9a-z\-]+$/.test(data.slug)) {
            errors.slug = 'Le slug ne doit contenir que des lettres minuscules, chiffres et tirets';
        }

        if (!data.categorie_id) {
            errors.categorie_id = 'La catégorie est obligatoire';
        }
        
        if (!data.tags || !data.tags.length) {
            errors.tags = 'Au moins un tag est obligatoire';
        }

        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Gestion de la soumission corrigée
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            // Utilisation de POST avec _method: PUT pour gérer les fichiers
            submitPost(route('posts.update', post.id), {
                preserveScroll: true,
                forceFormData: true, // Force l'utilisation de FormData pour les fichiers
                onSuccess: () => {
                    toast.success('Post mis à jour avec succès !');
                },
                onError: (errors) => {
                    console.error('Server errors:', errors);
                    if (errors.contenus) {
                        toast.error('Erreur : Le contenu est obligatoire');
                    }
                }
            });
        }
    };

    // Gestion du changement d'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setHasNewImage(true);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Fonction pour supprimer l'image actuelle
    const removeCurrentImage = () => {
        setImagePreview(null);
        setData('image', null);
        setHasNewImage(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Génération automatique du slug
    useEffect(() => {
        if (data.titre) {
            const slug = data.titre
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            setData('slug', slug);
        }
    }, [data.titre]);

    // Fusion des erreurs client et serveur
    const allErrors = { ...clientErrors, ...serverErrors };

    return (
        <AuthenticatedLayout>
            <Head title={`Modifier le post: ${post.titre}`} />
            
            <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-extrabold mb-8">
                        Modifier le post: {post.titre}
                    </h1>

                    <form 
                        onSubmit={handleSubmit}
                        className="space-y-8 bg-base-200 rounded-2xl p-8 shadow-xl"
                    >
                        {/* Titre */}
                        <div className="relative">
                            <input
                                type="text"
                                name="titre"
                                value={data.titre}
                                onChange={(e) => setData('titre', e.target.value)}
                                onBlur={() => validate()}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                id="titre"
                            />
                            <label 
                                htmlFor="titre"
                                className="absolute text-sm duration-300 transform -translate-y-4 bg-gray-400 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                            >
                                Titre *
                            </label>
                            {allErrors.titre && (
                                <p className="mt-2 text-red-500 text-sm">{allErrors.titre}</p>
                            )}
                        </div>

                        {/* Catégorie */}
                        <div className="relative">
                            <select
                                name="categorie_id"
                                value={data.categorie_id}
                                onChange={(e) => setData('categorie_id', e.target.value)}
                                onBlur={() => validate()}
                                className="w-full select"
                            >
                                <option value="">Sélectionner la catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.titre}
                                    </option>
                                ))}
                            </select>
                            {allErrors.categorie_id && (
                                <p className="mt-2 text-red-500 text-sm">{allErrors.categorie_id}</p>
                            )}
                        </div>

                        {/* Tags */}
                        <div>
                            <Listbox 
                                value={data.tags} 
                                onChange={(value) => setData('tags', value)}
                                multiple
                            >
                                <Listbox.Label className="label">Tags *</Listbox.Label>
                                <div className="relative">
                                    <Listbox.Button className="w-full dark:bg-gray-700 border-0 rounded-lg dark:text-white py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none text-left">
                                        {data.tags.length > 0 
                                            ? data.tags.map(id => tags.find(t => t.id === id)?.nom).join(', ')
                                            : "Sélectionnez des tags"}
                                    </Listbox.Button>
                                    <Listbox.Options className="absolute z-10 mt-1 w-full dark:bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                                        {tags.map((tag) => (
                                            <Listbox.Option
                                                key={tag.id}
                                                value={tag.id}
                                                className={({ active }) => `${
                                                    active ? 'bg-purple-600 text-white' : 'text-gray-300'
                                                } cursor-pointer select-none relative py-2 pl-10 pr-4`}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                                                            {tag.nom}
                                                        </span>
                                                        {selected && (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                ✓
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                            {allErrors.tags && (
                                <p className="mt-2 text-red-500 text-sm">{allErrors.tags}</p>
                            )}
                        </div>

                        {/* Upload Image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">
                                    Photo (optionnelle)
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="image"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept="image/*"
                                    />
                                    <div 
                                        className="bg-gray-700 rounded-lg p-4 text-center border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <span className="text-gray-400">
                                            {hasNewImage ? 'Nouvelle image sélectionnée' : 
                                             post.image ? 'Image actuelle (cliquez pour changer)' :
                                             'Glissez une image ou cliquez pour sélectionner'}
                                        </span>
                                    </div>
                                </div>
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={removeCurrentImage}
                                        className="text-red-500 text-sm hover:text-red-700"
                                    >
                                        Supprimer l'image
                                    </button>
                                )}
                                {allErrors.image && (
                                    <p className="mt-2 text-red-500 text-sm">{allErrors.image}</p>
                                )}
                            </div>
                            <div className="h-48 bg-gray-700 rounded-lg overflow-hidden">
                                {imagePreview ? (
                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Aperçu" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        Aperçu de l'image
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Message et Code Source */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">
                                    Votre Message *
                                </label>
                                <textarea
                                    name="contenus"
                                    value={data.contenus}
                                    onChange={(e) => setData('contenus', e.target.value)}
                                    onBlur={() => validate()}
                                    rows={10}
                                    className="w-full bg-gray-700 border-0 rounded-lg text-white py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                                {allErrors.contenus && (
                                    <p className="mt-2 text-red-500 text-sm">{allErrors.contenus}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-400">
                                    Code Source (optionnel)
                                </label>
                                <textarea
                                    name="codesource"
                                    value={data.codesource || ''}
                                    onChange={(e) => setData('codesource', e.target.value)}
                                    rows={10}
                                    className="w-full bg-gray-700 border-0 rounded-lg text-white font-mono py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                                {allErrors.codesource && (
                                    <p className="mt-2 text-red-500 text-sm">{allErrors.codesource}</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full md:w-auto px-8 py-3 font-medium btn btn-primary rounded-lg focus:outline-none focus:ring-2  ${
                                processing ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-teal-600'
                            }`}
                        >
                            {processing ? 'Mise à jour en cours...' : 'Mettre à jour'}
                        </button>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}