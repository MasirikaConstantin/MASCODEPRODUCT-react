import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AstuceForm = ({
    onSubmit,
    data,
    setData,
    errors,
    processing,
    categories,
    tags,
    imagePreview,
    onImageChange,
    onTagToggle,
    isEdit
}) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image', 'code-block'],
            ['clean']
        ],
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="label">
                        <span className={`label-text ${errors.titre ? 'text-error' : ''}`}>Titre*</span>
                    </label>
                    <input
                        type="text"
                        className={`input input-bordered w-full ${errors.titre ? 'input-error' : ''}`}
                        value={data.titre}
                        onChange={(e) => setData('titre', e.target.value)}
                    />
                    {errors.titre && <span className="text-error text-sm mt-1">{errors.titre}</span>}
                </div>

                <div>
                    <label className="label">
                        <span className={`label-text ${errors.categorie_id ? 'text-error' : ''}`}>Catégorie*</span>
                    </label>
                    <select
                        className={`select select-bordered w-full ${errors.categorie_id ? 'select-error' : ''}`}
                        value={data.categorie_id}
                        onChange={(e) => setData('categorie_id', e.target.value)}
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.titre}
                            </option>
                        ))}
                    </select>
                    {errors.categorie_id && <span className="text-error text-sm mt-1">{errors.categorie_id}</span>}
                </div>
            </div>

            <div>
                <label className="label">
                    <span className={`label-text ${errors.description ? 'text-error' : ''}`}>Description*</span>
                </label>
                <textarea
                    className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
                    rows="3"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
            </div>

            <div>
                <label className="label">
                    <span className={`label-text ${errors.tags ? 'text-error' : ''}`}>Tags (max 4)*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <div key={tag.id} className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={data.tags.includes(tag.id)}
                                    onChange={() => onTagToggle(tag.id)}
                                />
                                <span className="label-text">{tag.nom}</span>
                            </label>
                        </div>
                    ))}
                </div>
                {errors.tags && <span className="text-error text-sm mt-1">{errors.tags}</span>}
            </div>

            <div>
                <label className="label">
                    <span className={`label-text ${errors.contenus ? 'text-error' : ''}`}>Contenu*</span>
                </label>
                <ReactQuill
                    theme="snow"
                    value={data.contenus}
                    onChange={(value) => setData('contenus', value)}
                    modules={modules}
                    className={`${errors.contenus ? 'border border-error rounded' : ''}`}
                />
                {errors.contenus && <span className="text-error text-sm mt-1">{errors.contenus}</span>}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        onChange={onImageChange}
                    />
                    {errors.image && <span className="text-error text-sm mt-1">{errors.image}</span>}
                </div>

                <div>
                    {imagePreview && (
                        <div className="mt-2">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="max-w-xs rounded-lg shadow"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div>
                <label className="label">
                    <span className="label-text">Lien vidéo YouTube (facultatif)</span>
                </label>
                <input
                    type="url"
                    className="input input-bordered w-full"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={data.video}
                    onChange={(e) => setData('video', e.target.value)}
                />
                {errors.video && <span className="text-error text-sm mt-1">{errors.video}</span>}
            </div>

            <div className="flex justify-end space-x-4">
                <button type="button" className="btn btn-ghost">
                    Annuler
                </button>
                <button 
                    type="submit" 
                    className={`btn btn-primary ${processing ? 'loading' : ''}`}
                    disabled={processing}
                >
                    {isEdit ? 'Mettre à jour' : 'Créer'}
                </button>
            </div>
        </form>
    );
};

export default AstuceForm;