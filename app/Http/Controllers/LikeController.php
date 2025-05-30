<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'likeable_id' => 'required|integer',
            'likeable_type' => 'required|string|in:App\Models\Post,App\Models\Commentaire,App\Models\Astuce,App\Models\CommentaireAstuce',
        ]);

        $user = Auth::user();
        $likeableType = $validated['likeable_type'];
        $likeableId = $validated['likeable_id'];

        $existingLike = Like::where('user_id', $user->id)
                           ->where('likeable_id', $likeableId)
                           ->where('likeable_type', $likeableType)
                           ->first();

        if ($existingLike) {
            $existingLike->delete();
            $isLiked = false;
        } else {
            Like::create([
                'user_id' => $user->id,
                'likeable_id' => $likeableId,
                'likeable_type' => $likeableType,
            ]);
            $isLiked = true;
        }

        // Retourner le nouveau compte de likes
        $likesCount = Like::where('likeable_id', $likeableId)
                         ->where('likeable_type', $likeableType)
                         ->count();

        return back()->with([
            'isLiked' => $isLiked,
            'likesCount' => $likesCount,
        ]);
    }
}