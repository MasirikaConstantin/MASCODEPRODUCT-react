<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
{
    return [
        'id' => $this->id,
        'titre' => $this->titre,
        'image' => $this->image,
        'imageUrl' => $this->imageUrl(), // 👈 ici on ajoute la méthode
        'categorie' => new CategorieResource($this->whenLoaded('categorie')),
        'user' => new UserResource($this->whenLoaded('user')),
    ];
}

}
