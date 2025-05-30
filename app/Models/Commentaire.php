<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;


class Commentaire extends Model
{
    use HasFactory;
    protected $fillable=[
        'contenus',
        'user_id',
        'post_id',
        'codesource',
        'parent_id'
    ];
    public function imageUrls(){
        return Storage::disk('public')->url($this->image); 
    }
    public function likes() {
        return $this->morphMany(Like::class, 'likeable');
    }
    public function post()
{
    return $this->belongsTo(Post::class, 'post_id');
}
public function user(){
    return $this->belongsTo(User::class,'user_id');
}
public function reactionscomm()
{
    return $this->hasMany(ReactionComme::class);
}




public function parent()
{
    return $this->belongsTo(Commentaire::class, 'parent_id');
}

public function replies()
{
    return $this->hasMany(Commentaire::class, 'parent_id')->with('user', 'replies');
}
}


