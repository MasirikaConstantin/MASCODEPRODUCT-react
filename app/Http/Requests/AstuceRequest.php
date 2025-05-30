<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class AstuceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $astuceId = $this->route('astuce')?->id;

        return [
            'titre' => ['required', 'min:5', 'max:255'],
            'contenus' => ['required', 'min:20'],
            'description' => ['required', 'min:10', 'max:500'],
            'video' => ['nullable', 'url'],
            'slug' => ['required', 'min:8' ,'regex:/^[0-9a-z\-]+$/', Rule::unique('posts', 'slug')->ignore($this->astuce?->id)],  

            'image' => ['nullable', 'image', 'max:3000'],
            'categorie_id' => ['required', 'exists:categories,id'],
            'tags' => ['required', 'array', 'max:4'],
            'tags.*' => ['exists:tags,id'],
            'etat' => ['boolean']     ,   'remove_image' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'titre.required' => 'Le titre est obligatoire',
            'titre.min' => 'Le titre doit contenir au moins 5 caractères',
            'contenus.required' => 'Le contenu est obligatoire',
            'contenus.min' => 'Le contenu doit contenir au moins 20 caractères',
            'description.required' => 'La description est obligatoire',
            'categorie_id.required' => 'La catégorie est obligatoire',
            'tags.required' => 'Au moins un tag est obligatoire',
            'tags.max' => 'Vous ne pouvez sélectionner que 4 tags maximum',
            'image.image' => 'Le fichier doit être une image',
            'image.max' => 'La taille de l\'image ne doit pas dépasser 3MB'
        ];
    }

    protected function prepareForValidation(){
        $this->merge([
            'slug' => $this->input('slug') ?: Str::slug($this->input('titre') )//. '-' . Carbon::now()->format('H-i-s'))
    
            ]);
    }
}