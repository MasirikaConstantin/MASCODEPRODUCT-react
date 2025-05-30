import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function CreatePost() {
    const { categories, tags, errors: serverErrors } = usePage().props;
    const [imagePreview, setImagePreview] = useState(null);
    const [clientErrors, setClientErrors] = useState({});
    const fileInputRef = useRef(null);

    const { data, setData, post, processing } = useForm({
        titre: '',
        contenus: '',
        user_id: usePage().props.auth.user.id,
        image: null,
        slug: '',
        codesource: '',
        categorie_id: '',
        tags: [],
        etat: '0'
    });

    // Validation client
    const validate = () => {
        const errors = {};

        if (!data.titre.trim()) errors.titre = 'Le titre est obligatoire';
        else if (data.titre.length < 4) errors.titre = 'Le titre doit faire au moins 4 caractères';

        if (!data.contenus.trim()) errors.contenus = 'Le contenus est obligatoire';
        else if (data.contenus.length < 4) errors.contenus = 'Le contenus doit faire au moins 4 caractères';

        if (!data.slug.trim()) errors.slug = 'Le slug est obligatoire';
        else if (data.slug.length < 8) errors.slug = 'Le slug doit faire au moins 8 caractères';
        else if (!/^[0-9a-z\-]+$/.test(data.slug)) errors.slug = 'Le slug ne doit contenir que des lettres minuscules, chiffres et tirets';

        if (!data.categorie_id) errors.categorie_id = 'La catégorie est obligatoire';
        if (!data.tags.length) errors.tags = 'Au moins un tag est obligatoire';

        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Gestion de la soumission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            post(route('posts.store'), {
                preserveScroll: true,
                onError: (errors) => {
                    console.error('Server errors:', errors);
                }
            });
        }
    };

    // Gestion du changement d'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
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
            <Head title="Créer un nouveau post" />
            
            <main className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto ">
                    <h1 className="text-4xl font-extrabold  mb-8">
                        Créer un nouveau post
                    </h1>

                    <form 
                        onSubmit={handleSubmit}
                        encType="multipart/form-data" 
                        className="space-y-8 bg-base-200  rounded-2xl p-8 shadow-xl"
                    >
                        {/* Champ caché pour user_id */}
                        <input type="hidden" name="user_id" value={data.user_id} />

                        {/* Titre */}
                        <div className="relative">
                            <input
                                type="text"
                                name="titre"
                                value={data.titre}
                                onChange={(e) => setData('titre', e.target.value)}
                                onBlur={() => validate()}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm  bg-transparent rounded-lg border-1  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                id="titre"
                            />
                            <label 
                                htmlFor="titre"
                                className="absolute text-sm  duration-300 transform -translate-y-4 bg-gray-400 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
                                className="w-full  select"
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
                        <div className="relative">
                        <label className="label">Tags</label>

                            <select
                                name="tags"
                                multiple
                                value={data.tags}
                                onChange={(e) => {
                                    const options = [...e.target.selectedOptions];
                                    const values = options.map(option => option.value);
                                    setData('tags', values);
                                }}
                                onBlur={() => validate()}
                                className="w-full dark:bg-gray-700 border-0 rounded-lg dark:text-white py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            >
                                {tags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.nom}
                                    </option>
                                ))}
                            </select>
                            <small className="text-gray-400">Maintenez Ctrl (Windows) ou Cmd (Mac) pour sélectionner plusieurs tags</small>
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
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <span className="text-gray-400">
                                            {data.image ? 'Image sélectionnée' : 'Glissez une image ou cliquez pour sélectionner'}
                                        </span>
                                    </div>
                                </div>
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
                                    value={data.codesource}
                                    onChange={(e) => setData('codesource', e.target.value)}
                                    rows={10}
                                    className="w-full bg-gray-700 border-0 rounded-lg text-white font-mono py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                />
                                {allErrors.codesource && (
                                    <p className="mt-2 text-red-500 text-sm">{allErrors.codesource}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all ${
                                processing ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600'
                            }`}
                        >
                            {processing ? 'Publication en cours...' : 'Publier'}
                        </button>
                    </form>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}