<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = ['message_group_id', 'user_id', 'invited_by', 'status', 'accepted_at'];

    protected $casts = [
        'accepted_at' => 'datetime',
    ];

    public function messageGroup()
    {
        return $this->belongsTo(MessageGroup::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function inviter()
    {
        return $this->belongsTo(User::class, 'invited_by');
    }
}