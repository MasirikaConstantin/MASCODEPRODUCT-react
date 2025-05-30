<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;
    protected $fillable=[
        'nom',
        'couleur',
        'status'
    ];
    
    public function astucess(){
        return $this->belongsToMany(Astuce::class);
    }
}
