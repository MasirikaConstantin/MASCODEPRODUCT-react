<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Categorie extends Model
{
    use HasFactory;
    protected $fillable=[
        'titre',
        'description',
        'couleur',
        'image',
        'status',
        'svg'
    ];
    public function posts(){
        return $this->hasMany(Post::class);
    }
    public function imageUrlcat(){
        return Storage::disk('public')->url($this->image); 
    }
}
