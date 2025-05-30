<?php
// app/Console/Commands/SendNewsletter.php
namespace App\Console\Commands;

use App\Models\Subscriber;
use App\Mail\NewsletterMail;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendNewsletter extends Command
{
    protected $signature = 'send:newsletter 
                            {--test : Envoyer un email de test à l\'adresse du développeur}';
    
    protected $description = 'Envoyer la newsletter aux abonnés';

    public function handle()
    {
        if ($this->option('test')) {
            return $this->sendTestNewsletter();
        }

        $this->sendNewsletterToSubscribers();
    }

    protected function sendTestNewsletter()
    {
        $testEmail = 'votre@email.com'; // Remplacez par votre email
        $content = $this->getNewsletterContent();

        Mail::to($testEmail)->send(new NewsletterMail($content, (object) [
            'token' => 'test-token',
            'email' => $testEmail
        ]));

        $this->info("Email de test envoyé à {$testEmail}");
    }

    // app/Console/Commands/SendNewsletter.php
protected function sendNewsletterToSubscribers()
{
    $content = $this->getNewsletterContent();
    $subscribers = Subscriber::whereNotNull('email_verified_at')
        ->where('is_active', true)
        ->cursor();

    foreach ($subscribers as $subscriber) {
        try {
            // Vérifiez que le subscriber a bien un token
            if (empty($subscriber->token)) {
                $subscriber->token = \Str::random(32);
                $subscriber->save();
            }

            Mail::to($subscriber->email)
                ->send(new NewsletterMail($content, $subscriber));
            
        } catch (\Exception $e) {
            $this->error("Erreur pour {$subscriber->email}: " . $e->getMessage());
        }
    }
}

protected function getNewsletterContent()
{
    return [
        'subject' => 'Votre newsletter mensuelle - ' . now()->format('F Y'),
        'title' => 'Les dernières actualités',
        'body' => implode("\n\n", [
            "**Bonjour cher abonné !**",
            "Voici les dernières nouveautés :",
            "",
            "• Nouvel article : [10 astuces Laravel](".url('/articles/10-astuces').")",
            "• Interview avec notre développeur principal",
            "• Prochains événements à ne pas manquer",
            "",
            "Nous espérons que ces contenus vous plairont !"
        ]),
        'cta_text' => 'Voir toutes les actualités',
        'cta_url' => url('/actualites')
    ];
}
}