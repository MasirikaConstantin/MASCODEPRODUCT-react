<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewAstuce extends Model
{
    //
    protected $fillable = [
        'astuce_id',
        'user_id',
        'ip_address',
        'user_agent',
    ];
}
