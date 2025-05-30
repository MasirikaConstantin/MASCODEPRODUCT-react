<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Routing\Route;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'timezone',
        "settings",
        'image',
        'provider',
        'provider_id',
        'provider_token',
        'provider_refresh_token',
    ];
    public function providers()
    {
        return $this->hasMany(UserProvider::class);
    }

    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

  

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
    'settings' => 'array',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function imageUrls(){
        return $this->image ? asset('storage/' . $this->image) : null;
        //return Storage::disk('public')->url($this->image); 
    }

    
    public function commentaire(){
        return $this->belongsToMany(Commentaire::class);
    }

    public function getImageUrlAttribute()
{
    return $this->image ? Storage::url($this->image) : null;
}
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }
    public function astuces()
    {
        return $this->hasMany(Astuce::class);
    }

    public function astuce()
    {
        return $this->hasMany(Post::class);
    }

    public function imageUrlAstuces(){
        return $this->image ? asset('storage/' . $this->image) : null;
        //return Storage::disk('public')->url($this->image); 
    }
    public function com()
    {
        return $this->hasMany(Commentaire::class);
    }
    public function reactions()
{
    return $this->hasMany(Reaction::class);
}

    public function reactionscomm()
    {
        return $this->hasMany(ReactionComme::class);
    }

    ######################################

    public function subscriptions()
    {
        return $this->belongsToMany(User::class, 'subscriptions', 'user_id', 'follows_id')->withTimestamps();
    }

    public function subscribers()
    {
        return $this->belongsToMany(User::class, 'subscriptions', 'follows_id', 'user_id')->withTimestamps();
    }

    public function subscribeTo(User $user)
    {
        return $this->subscriptions()->attach($user->id);
    }

    public function unsubscribeFrom(User $user)
    {
        return $this->subscriptions()->detach($user->id);
    }

    public function receivedReactions()
    {
        return $this->hasManyThrough(
            Reaction::class,
            Post::class,
            'user_id',     // Clé étrangère sur la table posts
            'post_id',     // Clé étrangère sur la table reactions
            'id',          // Clé locale de users
            'id'          // Clé locale de posts
        );
    }
     // Méthode pour obtenir uniquement les likes positifs
     public function receivedLikes()
     {
         return $this->receivedReactions()->where('reaction');
     }
 
     
     public function enregistrements()
     {
         return $this->hasMany(Enregistrement::class);
     }
     
     public function savedPosts()
     {
         return $this->belongsToMany(Astuce::class, 'enregistrements')->withTimestamps();
     }

        public function messageGroups()
    {
        return $this->belongsToMany(MessageGroup::class)
            ->withPivot('is_admin', 'last_read_at')
            ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }

    public function sentInvitations()
    {
        return $this->hasMany(Invitation::class, 'invited_by');
    }
    public function getRouteKey()
{
    // Génère un slug à la volée : nom-slugifié + id
    return Str::slug($this->name).'-'.$this->id;
}

public function resolveRouteBinding($value, $field = null)
{
    // Extrait l'ID depuis la fin du slug
    $id = last(explode('-', $value));
    
    return $this->where('id', $id)->firstOrFail();
}

public function comments() {
    return $this->hasMany(Commentaire::class);
}

public function likes() {
    return $this->hasMany(Like::class);
}

public function followers() {
    return $this->belongsToMany(User::class, 'followers', 'following_id', 'follower_id');
}
}
