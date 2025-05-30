<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostValidate extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'titre' => ['required', 'min:4'],
            'contenus' => ['required', 'min:4'],
            'user_id' => ['required', 'exists:users,id'],
            'image' => ['nullable','image', 'max:3000'],
            'slug' => [
                'required', 
                'min:8',
                'regex:/^[0-9a-z\-]+$/',
                Rule::unique('posts', 'slug')->ignore($this->post?->id)
            ],
            'codesource' => ['nullable'],
            'categorie_id' => ['required', 'exists:categories,id'],
            'tags' => ['required', 'array', 'exists:tags,id'],
            'etat' => ['nullable']
        ];
    }

    public function messages()
    {
        return [
            'titre.required' => 'Le titre est obligatoire',
            'titre.min' => 'Le titre doit faire au moins 4 caractères',
            'contenus.required' => 'Le contenu est obligatoire',
            'contenus.min' => 'Le contenu doit faire au moins 4 caractères',
            'slug.required' => 'Le slug est obligatoire',
            'slug.min' => 'Le slug doit faire au moins 8 caractères',
            'slug.regex' => 'Le slug ne doit contenir que des lettres minuscules, chiffres et tirets',
            'slug.unique' => 'Ce slug est déjà utilisé',
            'categorie_id.required' => 'La catégorie est obligatoire',
            'tags.required' => 'Au moins un tag est obligatoire',
            'image.image' => 'Le fichier doit être une image valide',
            'image.max' => "L'image ne doit pas dépasser 3Mo"
        ];
    }
}