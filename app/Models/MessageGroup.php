<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageGroup extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'avatar'];

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('is_admin', 'last_read_at')
            ->withTimestamps();
    }

    public function admins()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('is_admin')
            ->wherePivot('is_admin', true);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }

    public function latestMessage()
{
    return $this->hasOne(Message::class)->latest();
}
    
}