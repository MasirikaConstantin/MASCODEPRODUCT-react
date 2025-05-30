<?php
// app/Mail/NewsletterMail.php
namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewsletterMail extends Mailable
{
    use Queueable, SerializesModels;

    public $content;
    public $unsubscribeLink;
    public $subscriber; // Ajout de la propriété manquante

    /**
     * Create a new message instance.
     */
    public function __construct(array $content, Subscriber $subscriber)
    {
        $this->content = $content;
        $this->subscriber = $subscriber; // Initialisation de la propriété subscriber
        $this->unsubscribeLink = route('newsletter.unsubscribe', [
            'token' => $subscriber->token,
            'email' => urlencode($subscriber->email) // Encode l'email pour l'URL
        ]);
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->to($this->subscriber->email) // Ajout du destinataire
                   ->subject($this->content['subject'] ?? 'Votre newsletter')
                   ->markdown('emails.newsletter')
                   ->with([
                       'content' => $this->content,
                       'subscriber' => $this->subscriber, // Utilisation de la propriété
                       'unsubscribeLink' => $this->unsubscribeLink
                   ]);
    }
}