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
    $currentDate = now()->translatedFormat('F Y');
    
    return [
        'subject' => "📬 Votre résumé mensuel - {$currentDate}",
        'title' => "✨ Ce mois-ci chez " . config('app.name'),
        'sections' => [
            [
                'title' => '🚀 Les incontournables',
                'items' => [
                    ['text' => '10 astuces Laravel pro', 'url' => url('/astuces'), 'desc' => 'Boostez vos projets'],
                    ['text' => 'Nos nouveaux posts techniques', 'url' => url('/posts'), 'desc' => 'Dernières trouvailles'],
                ]
            ],
            
            [
                'title' => '📅 Agenda',
                'items' => [
                    'Webinaire : Optimisation Eloquent - ' . now()->addDays(5)->format('d/m'),
                    'Meetup régional - ' . now()->addWeeks(2)->format('d/m/Y')
                ]
            ]
        ],
        'cta_text' => '📖 Lire le magazine complet',
        'cta_url' => url('/'),
        'footer_note' => '« Merci de faire partie de notre communauté ! »'
    ];
}
}