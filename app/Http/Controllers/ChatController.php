<?php

namespace App\Http\Controllers;

use App\Services\GroqService;  // <-- Changé ici
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function ask(Request $request, GroqService $groq)  // <-- Changé ici
    {
        $request->validate(['message' => 'required|string']);

        $response = $groq->askGroq($request->message);  // <-- Changé ici

        if (isset($response['error'])) {
            return response()->json(['error' => $response['error']], 500);
        }

        return response()->json([
            'reply' => $response['choices'][0]['message']['content'] ?? 'Aucune réponse.'
        ]);
    }

    public function showChat()
{
    // Récupère les messages depuis la session ou DB
    $messages = session('chat_history', []);

    return Inertia::render('ChatPage', [
        'messages' => $messages // Envoie les vrais messages
    ]);
}

// app/Http/Controllers/ChatController.php
 // Assure-toi d'avoir ce service

public function sendMessage(Request $request, GroqService $groqService)
{
    $validated = $request->validate([
        'message' => 'required|string|min:1|max:1000'
    ]);

    // Garantit que le contenu est toujours une string
    $userMessage = (string)$validated['message'];
    

    // 1. Stocke le message de l'utilisateur
    $chatHistory = session('chat_history', []);
    $chatHistory[] = [
        'sender' => 'user',
        'content' => $request->message
    ];

    // 2. Appelle l'API Groq
    try {
        $aiResponse = $groqService->askGroq($request->message);
        
        // 3. Stocke la réponse de l'IA
        $chatHistory[] = [
            'sender' => 'ia',
            'content' => $aiResponse['choices'][0]['message']['content'] ?? "Désolé, je n'ai pas pu répondre."
        ];

    } catch (\Exception $e) {
        $chatHistory[] = [
            'sender' => 'ia',
            'content' => "Erreur: " . $e->getMessage()
        ];
    }

    // 4. Sauvegarde la conversation
    session(['chat_history' => $chatHistory]);

    // 5. Renvoie vers la page de chat
    return redirect()->route('chat.show'); 
}
}