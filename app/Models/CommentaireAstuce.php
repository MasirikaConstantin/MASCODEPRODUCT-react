<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentaireAstuce extends Model
{
    protected $table = 'commentaireastuces';
    use HasFactory;
    protected $fillable=[
        'contenus',
        'user_id',
        'astuce_id',
        "parent_id",
        'codesource'
    ];

    public function post()
{
    return $this->belongsTo(Astuce::class, 'post_id');
}
public function user(){
    return $this->belongsTo(User::class,'user_id');
}

public function replies()
{
    return $this->hasMany(CommentaireAstuce::class, 'parent_id')->with('user', 'replies');
}

public function likes() {
    return $this->morphMany(Like::class, 'likeable');
}


public function parent()
{
    return $this->belongsTo(CommentaireAstuce::class, 'parent_id');
}

}
