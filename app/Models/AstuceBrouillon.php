<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AstuceBrouillon extends Model
{
    use HasFactory;
    protected $fillable=[
        'titre',
        'video',
        'image',
        'slug',
        'contenus'
    ];
}
