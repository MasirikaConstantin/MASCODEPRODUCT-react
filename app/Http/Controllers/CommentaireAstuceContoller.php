<?php

namespace App\Http\Controllers;

use App\Models\Astuce;
use Illuminate\Http\Request;

class CommentaireAstuceContoller extends Controller
{
    //

    public function store(Astuce $astuce, Request $request)
{
$validated = $request->validate([
        'contenus' => 'required|string|min:5|max:2000',
        'parent_id' => 'nullable',
        'astuce_id'=>'exists:astuces,id'
    ]);
//dd($validated);

    $astuce = Astuce::findOrFail($validated['astuce_id']);
    $comment = $astuce->comments()->create([
        'contenus' => $validated['contenus'],
        'parent_id' => $validated['parent_id'],
        'user_id' => auth()->id(),
        //"astuce_id"=>$validated['astuce_id']
    ]);

    // Chargez toutes les relations nécessaires
    $comment->load(['user', 'replies']);

    return back()->with([
        'comment' => $comment->load(['user', 'replies']),

        'message' => 'Commentaire ajouté avec succès',
        'new_counts' => [
            'comments_count' => $astuce->comments()->count(),
            'replies_count' => $astuce->comments()->where('parent_id', $validated['parent_id'] ?? null)->count(),
        ]
    ]);
}
}
