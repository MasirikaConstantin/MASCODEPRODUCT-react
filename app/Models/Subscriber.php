<?php
// app/Models/Subscriber.php
namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Notifications\VerifyNewsletterSubscription;

class Subscriber extends Model
{
    use Notifiable; // Ajoutez ce trait

    protected $table = 'newsletter_subscribers';
    protected $fillable = ['email', 'nom', 'is_active', 'token','email_verified_at'];
    
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($subscriber) {
            $subscriber->token = Str::random(32);
        });
    }

    // Ajoutez cette méthode
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyNewsletterSubscription());
    }
}