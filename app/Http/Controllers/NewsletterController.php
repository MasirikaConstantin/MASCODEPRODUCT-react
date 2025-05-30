<?php

// app/Http/Controllers/NewsletterController.php
namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSubscriberRequest;

class NewsletterController extends Controller
{
    public function store(StoreSubscriberRequest $request)
    {
        $subscriber = Subscriber::create([
            'email' => $request->email,
            'nom' => $request->nom,
            'is_active' => false, // Désactivé jusqu'à vérification
        ]);

        $subscriber->sendEmailVerificationNotification();

        return redirect()->back()
            ->with('success', 'Merci pour votre inscription ! Veuillez vérifier votre email.');
    }

    // NewsletterController.php
    public function unsubscribe($token, $email)
    {
        $subscriber = Subscriber::where('email', $email)
                            ->where('token', $token)
                            ->firstOrFail();

        $subscriber->delete();

        return redirect('/')->with('success', 'Vous avez été désabonné de notre newsletter.');
    }

    public function verify($token)
{
    $subscriber = Subscriber::where('token', $token)->firstOrFail();

    $subscriber->update([
        'is_active' => true,
        'email_verified_at' => now(),
        'token' => null,
    ]);

    return redirect('/')
           ->with('success', 'Votre email a été vérifié avec succès !');
}
}