import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/AuthenticatedLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Edit({ astuce, categories, tags }) {
    const { data, setData, put, post, processing, errors } = useForm({
        titre: astuce.titre || '',
        contenus: astuce.contenus || '',
        description: astuce.description || '',
        video: astuce.video || '',
        image: null, // Toujours null pour les modifications
        remove_image: false, // Nouveau champ pour indiquer si on supprime l'image
        categorie_id: astuce.categorie_id || '',
        tags: astuce.tags?.map(tag => tag.id) || [],
        etat: astuce.etat || false,
        _method: 'PUT'
    });

    const [imagePreview, setImagePreview] = useState(astuce.image || null);
    const [hasNewImage, setHasNewImage] = useState(false); // Track si nouvelle image
    const quillRef = useRef(null);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image', 'code-block'],
            ['clean'],
            [{ 'font': [] }],
            [{ 'align': [] }],
        ]
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch(route('upload.image'), {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Accept': 'application/json'
                    }
                });

                const result = await response.json();
                
                if (result.success) {
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', result.url);
                } else {
                    console.error('Erreur lors de l\'upload', result.message);
                }
            } catch (error) {
                console.error('Erreur lors de l\'upload', error);
                alert('Une erreur est survenue lors de l\'upload de l\'image');
            }
        };
    };

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const toolbar = quill.getModule('toolbar');
            toolbar.addHandler('image', handleImageUpload);
            
            quill.clipboard.dangerouslyPasteHTML(data.contenus);
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setData('remove_image', false);
            setHasNewImage(true);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleTagChange = (tagId) => {
        const currentTags = data.tags || [];
        const newTags = currentTags.includes(tagId)
            ? currentTags.filter(id => id !== tagId)
            : [...currentTags, tagId];
        
        if (newTags.length <= 4) {
            setData('tags', newTags);
        } else {
            alert('Vous ne pouvez sélectionner que 4 tags maximum');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            setData('contenus', quill.root.innerHTML);
        }
        
        // Toujours utiliser POST avec _method pour les modifications
        // car on peut avoir des fichiers
        post(route('astuces.update', astuce.id), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const removeImage = () => {
        setData('image', null);
        setData('remove_image', true);
        setImagePreview(null);
        setHasNewImage(false);
    };

    return (
        <Layout>
            <Head title={`Éditer ${astuce.titre}`} />
            
            <div className="container mx-auto px-4 py-8">
                <div className="breadcrumbs text-sm mb-6">
                    <ul>
                        <li><a href={route('home')}>Accueil</a></li>
                        <li><a href={route('astuces.index')}>Astuces</a></li>
                        <li>Éditer "{astuce.titre}"</li>
                    </ul>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">Éditer l'astuce</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Titre */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Titre *</span>
                                </label>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full ${errors.titre ? 'input-error' : ''}`}
                                    value={data.titre}
                                    onChange={(e) => setData('titre', e.target.value)}
                                    placeholder="Le titre de l'astuce"
                                />
                                {errors.titre && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.titre}</span>
                                    </label>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Catégorie */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Catégorie *</span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${errors.categorie_id ? 'select-error' : ''}`}
                                        value={data.categorie_id}
                                        onChange={(e) => setData('categorie_id', e.target.value)}
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.titre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categorie_id && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.categorie_id}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Vidéo */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Lien vidéo YouTube (optionnel)</span>
                                    </label>
                                    <input
                                        type="url"
                                        className={`input input-bordered w-full ${errors.video ? 'input-error' : ''}`}
                                        value={data.video}
                                        onChange={(e) => setData('video', e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                    {errors.video && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.video}</span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description *</span>
                                </label>
                                <textarea
                                    className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description de l'astuce pour faciliter la recherche"
                                ></textarea>
                                {errors.description && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.description}</span>
                                    </label>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Tags * (maximum 4)</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <label key={tag.id} className="cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary"
                                                checked={data.tags?.includes(tag.id) || false}
                                                onChange={() => handleTagChange(tag.id)}
                                            />
                                            <span className="ml-2 badge badge-outline">{tag.nom}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.tags && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.tags}</span>
                                    </label>
                                )}
                            </div>

                            {/* Contenu */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contenu *</span>
                                </label>
                                <div className="bg-base-100 rounded-lg">
                                    <ReactQuill
                                        ref={quillRef}
                                        theme="snow"
                                        value={data.contenus}
                                        onChange={(content) => setData('contenus', content)}
                                        modules={modules}
                                        placeholder="Entrez le contenu de votre astuce..."
                                        style={{ minHeight: '300px' }}
                                    />
                                </div>
                                {errors.contenus && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.contenus}</span>
                                    </label>
                                )}
                            </div>

                            {/* Image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Image {astuce.image && !hasNewImage && 'actuelle'}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        className={`file-input file-input-bordered w-full ${errors.image ? 'file-input-error' : ''}`}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {errors.image && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.image}</span>
                                        </label>
                                    )}
                                    {imagePreview && (
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-error mt-2"
                                            onClick={removeImage}
                                        >
                                            {hasNewImage ? 'Supprimer la nouvelle image' : 'Supprimer l\'image actuelle'}
                                        </button>
                                    )}
                                </div>

                                {/* Aperçu de l'image */}
                                {imagePreview && (
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">
                                                {hasNewImage ? 'Aperçu nouvelle image' : 'Image actuelle'}
                                            </span>
                                        </label>
                                        <img
                                            src={imagePreview}
                                            alt="Aperçu"
                                            className="max-h-48 rounded-lg object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* État */}
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Publier immédiatement</span>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={data.etat}
                                        onChange={(e) => setData('etat', e.target.checked)}
                                    />
                                </label>
                            </div>

                            {/* Boutons */}
                            <div className="card-actions justify-end">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => window.history.back()}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${processing ? 'loading' : ''}`}
                                    disabled={processing}
                                >
                                    {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}