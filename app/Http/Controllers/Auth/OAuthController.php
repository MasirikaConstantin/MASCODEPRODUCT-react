<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProvider;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Log;

class OAuthController extends Controller
{
    // Configuration des providers
    protected $providers = [
        'google' => [
            'scopes' => ['openid', 'profile', 'email'],
            'fields' => []
        ],
        'github' => [
            'scopes' => ['user:email'],
            'fields' => []
        ],
        
    ];

    public function redirectToProvider($provider)
    {
        if (!array_key_exists($provider, $this->providers)) {
            abort(404);
        }

        $driver = Socialite::driver($provider);
        
        // Configuration spécifique au provider
        if (!empty($this->providers[$provider]['scopes'])) {
            $driver->scopes($this->providers[$provider]['scopes']);
        }
        
        if (!empty($this->providers[$provider]['fields'])) {
            $driver->fields($this->providers[$provider]['fields']);
        }

        return $driver->redirect();
    }

    public function handleProviderCallback($provider)
    {
        if (!array_key_exists($provider, $this->providers)) {
            abort(404);
        }

        try {
            $socialUser = Socialite::driver($provider)->user();
            
            // Log pour débogage
            Log::info('OAuth Callback', [
                'provider' => $provider,
                'user' => $socialUser
            ]);

            // Trouver ou créer l'utilisateur
            $user = $this->findOrCreateUser($provider, $socialUser);

            Auth::login($user, true);

            return redirect()->intended('/dashboard');

        } catch (\Exception $e) {
            Log::error('OAuth Error', [
                'provider' => $provider,
                'error' => $e->getMessage()
            ]);
            
            return redirect()
                ->route('login')
                ->withErrors('Échec de la connexion avec ' . ucfirst($provider) . ': ' . $e->getMessage());
        }
    }

    protected function findOrCreateUser($provider, $socialUser)
{

    
    // 1. Vérifier si le provider existe déjà
    $userProvider = UserProvider::where('provider', $provider)
                               ->where('provider_id', $socialUser->getId())
                               ->with('user') // Chargement optimisé
                               ->first();

    if ($userProvider) {
        return $userProvider->user; // Retourne l'utilisateur existant
    }

    // 2. Chercher par email (si disponible)
    $user = null;
    if ($email = $socialUser->getEmail()) {
        $user = User::where('email', $email)->first();
    }

    // 3. Créer un nouvel utilisateur si aucun n'existe
    if (!$user) {
        $user = User::create([
            'name' => $socialUser->getName() ?? $socialUser->getNickname(),
            'email' => $email,
            'password' => Hash::make(Str::random(32)), // Mot de passe aléatoire sécurisé
            'settings' => [
                    'theme' => 'dark',
                    'font' => 'comfortaa',
                    'compact_mode' => true,
                    'notifications' => true,
                ],
        ]);
    }

    // 4. Lier le provider à l'utilisateur (nouveau ou existant)
    $user->providers()->updateOrCreate(
        [
            'provider' => $provider,
            'provider_id' => $socialUser->getId(),
        ],
        [
            'access_token' => $socialUser->token,
            'refresh_token' => $socialUser->refreshToken,
        ]
    );

    return $user;
}
}