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

    /**
     * Create a new message instance.
     */
    // app/Mail/NewsletterMail.php
    public function __construct($content, Subscriber $subscriber)
    {
        $this->content = $content;
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
        return $this->subject($this->content['subject'] ?? 'Votre newsletter')
                   ->markdown('emails.newsletter')
                   ->with([
                       'content' => $this->content,
                       'unsubscribeLink' => $this->unsubscribeLink
                   ]);
    }
}