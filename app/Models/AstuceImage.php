<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AstuceImage extends Model
{
    use HasFactory;

    protected $fillable = ['astuce_id', 'image_url'];

    public function astuce()
    {
        return $this->belongsTo(Astuce::class);
    }
}
