<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    use HasFactory;
    protected $fillable=[
        'titre',
        'contenus',
        'user_id',
        'tag_id',
        'categorie_id',
        'image',
        'codesource',
        'slug',
        'views_count',
        'etat'
    ];
    public function imageUrl(){
        return $this->image ? asset('storage/' . $this->image) : null;
        //return Storage::disk('public')->url($this->image); 
    }
    // Dans app/Models/Post.php
public function getIsBookmarkedAttribute()
{
    if (!auth()->check()) {
        return false;
    }
    
    return $this->bookmarks->contains('user_id', auth()->id());
}
    public function bookmarks()
    {
        return $this->morphMany(Bookmark::class, 'bookmarkable');
    }
    protected $appends = ['image_url'];

public function getImageUrlAttribute()
{
    return $this->image ? asset('storage/' . $this->image) : null;
}

    public function category(){
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }
    public function categorie(){
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function tags(){
        return $this->belongsToMany(Tag::class);
    }

    public function comments()
{
    return $this->hasMany(Commentaire::class);
}
public function reactions()
{
    return $this->hasMany(Reaction::class);
}
    public function incrementViewsCount()
    {
        $this->views_count++;
        $this->save();
    }
    
    
    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'enregistrements')->withTimestamps();
    }
    public function views() {
        return $this->hasMany(View::class);
    }

    
    public function likes()
{
    return $this->morphMany(Like::class, 'likeable');
}
}
