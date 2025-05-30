<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentaireAstuceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'contenus'=>['required', 'min:10'],
            'parent_id' => 'nullable',
            'user_id'=>['required', 'exists:users,id'],
            'astuce_id'=>['required', 'exists:astuces,id'],
            'codesource'=>[ 'nullable']
        ];
    }
}
