<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Astuce extends Model
{
    use HasFactory;
    protected $fillable=[
        'titre',
        'video',
        'image',
        'slug',
        'contenus',
        'user_id',
        'image',
        'categorie_id',
        'description'
    ];
    public function tags(){
        return $this->belongsToMany(Tag::class);
    }
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public function category(){
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }
    public function imageUrlAstuce(){
        return $this->image ? asset('storage/' . $this->image) : null;
        //return Storage::disk('public')->url($this->image); 
    }

    public function enregistrements()
    {
        return $this->hasMany(Enregistrement::class);
    }


   
    public function imageUrl(){
        return $this->image ? asset('storage/' . $this->image) : null;
        //return Storage::disk('public')->url($this->image); 
    }
    
    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class, 'bookmarkable');
    }
    // Dans app/Models/Post.php
public function getIsBookmarkedAttribute()
{
    if (!auth()->check()) {
        return false;
    }
    
    return $this->bookmarks->contains('user_id', auth()->id());
}
    public function getAvatarUrlAttribute()
{
    return $this->user->image ?? '/images/default-avatar.png';
}
        public function comments()
    {
        return $this->hasMany(CommentaireAstuce::class,'astuce_id');
    }
    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function images()
{
    return $this->hasMany(AstuceImage::class);
}

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function likes() {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function views() {
        return $this->hasMany(ViewAstuce::class);
    }
}
