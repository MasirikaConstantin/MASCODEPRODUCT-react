<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    protected $fillable = [
        'post_id',
        'user_id',
        'ip_address',
        'user_agent',
    ];

    
}
