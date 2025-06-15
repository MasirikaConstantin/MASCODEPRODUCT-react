<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class GroqService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.groq.com/openai/v1/',
            'headers' => [
                'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
                'Content-Type' => 'application/json',
            ],
            'timeout' => 30,  // Timeout augmenté pour éviter les erreurs
        ]);
    }

    public function askGroq(string $userMessage)
    {
        try {
            $response = $this->client->post('chat/completions', [
                'json' => [
                    'model' => 'llama3-70b-8192',  // Modèle gratuit et performant
                    'messages' => [
                        ['role' => 'system', 'content' => 'Tu es un assistant utile qui répond en français.'],
                        ['role' => 'user', 'content' => $userMessage],
                    ],
                ],
            ]);

            return json_decode($response->getBody(), true);

        } catch (\Exception $e) {
            Log::error("Erreur Groq API : " . $e->getMessage());
            return ['error' => 'Failed to get response from AI.'];
        }
    }
}