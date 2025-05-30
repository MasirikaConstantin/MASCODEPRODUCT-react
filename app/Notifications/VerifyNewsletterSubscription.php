<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyNewsletterSubscription extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    // app/Notifications/VerifyNewsletterSubscription.php
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Vérifiez votre abonnement à la newsletter')
            ->line('Merci de vous être abonné à notre newsletter !')
            ->action('Confirmer mon abonnement', route('newsletter.verify', $notifiable->token))
            ->line("Si vous n'avez pas demandé cet abonnement, ignorez cet email.");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
