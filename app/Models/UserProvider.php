<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProvider extends Model
{
    protected $fillable=[
        'user_id',
            'provider',
            'provider_id',
            'access_token',
            'refresh_token',
    ];
    //
    public function user() {
        return $this->belongsTo(User::class);
    }
}
