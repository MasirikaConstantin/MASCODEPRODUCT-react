<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentaireController extends Controller
{
    /**
     * Enregistre un nouveau commentaire
     */
    public function store(Post $post, Request $request)
{
    $validated = $request->validate([
        'contenus' => 'required|string|min:5|max:2000',
        'parent_id' => 'nullable',
        'post_id'=>'exists:posts,id'
    ]);
    $post = Post::findOrFail($validated['post_id']);

    $comment = $post->comments()->create([
        'contenus' => $validated['contenus'],
        'parent_id' => $validated['parent_id'],
        'user_id' => auth()->id(),
        //"post_id"=>$validated['post_id']
    ]);

    // Chargez toutes les relations nécessaires
    $comment->load(['user', 'replies']);

    return back()->with([
        'comment' => $comment->load(['user', 'replies']),

        'message' => 'Commentaire ajouté avec succès',
        'new_counts' => [
            'comments_count' => $post->comments()->count(),
            'replies_count' => $post->comments()->where('parent_id', $validated['parent_id'] ?? null)->count(),
        ]
    ]);
}

    /**
     * Supprime un commentaire (soft delete)
     */
    public function destroy(Commentaire $commentaire)
    {
        //$this->authorize('delete', $commentaire);

        $commentaire->delete();

        return back()->with('success', 'Commentaire supprimé');
    }
}