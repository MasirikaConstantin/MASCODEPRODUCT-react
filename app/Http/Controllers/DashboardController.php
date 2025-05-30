<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Astuce;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        
        // Posts publiés
        $posts = Post::with(['tags', 'category', 'user'])
            ->where('user_id', $user->id)
            ->where('etat', 1)
            ->orderBy('created_at', 'desc')
            ->paginate(5, ['*'], 'posts_page');
        
        // Brouillons
        $drafts = Post::with(['tags', 'category', 'user'])
            ->where('user_id', $user->id)
            ->where('etat', 0)
            ->orderBy('created_at', 'desc')
            ->paginate(5, ['*'], 'drafts_page');
        
        // Astuces
        $astuces = Astuce::with(['tags', 'category', 'user'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(3, ['*'], 'astuces_page');
            
        // Récupère tous les bookmarks avec leurs relations
        $bookmarks = $user->bookmarks()
        ->with(['bookmarkable' => function($query) {
            $query->with('user'); // Charge l'utilisateur associé
        }])
        ->latest()
        ->get()
        ->groupBy('bookmarkable_type'); // Sépare par type

    // Transforme pour faciliter l'affichage
    $savedItems = $bookmarks->map(function($items) {
        return $items->map(function($bookmark) {
            $item = $bookmark->bookmarkable;
            $item->bookmark_id = $bookmark->id; // Pour la suppression
            $item->type = class_basename($bookmark->bookmarkable_type);
            return $item;
        });
    })->flatten();
            
        // Formatage des durées
        $posts->each(function ($post) {
            $post->duration = $this->formatDuration($post->created_at);
        });
        
        $drafts->each(function ($draft) {
            $draft->duration = $this->formatDuration($draft->created_at);
        });
        
        return inertia('Dashboard', [
            'posts' => $posts,
            'drafts' => $drafts,
            'astuces' => $astuces,
            'savedItems' => $savedItems,

            'user' => $user->only(['id', 'name', 'email', 'image']),
            'stats' => [
                'postsCount' => $user->posts()->count(),
                'subscribersCount' => $user->subscribers()->count(),
                'viewsCount' => $user->posts()->sum('views_count'),
            ]
        ]);
    }
    
    private function formatDuration($date)
    {
        $now = Carbon::now();
        $diff = $date->diff($now);
        
        $parts = [];
        
        if ($diff->y > 0) $parts[] = $diff->y . ' an' . ($diff->y > 1 ? 's' : '');
        if ($diff->m > 0) $parts[] = $diff->m . ' mois';
        if ($diff->d > 0) $parts[] = $diff->d . ' jour' . ($diff->d > 1 ? 's' : '');
        if ($diff->h > 0) $parts[] = $diff->h . ' heure' . ($diff->h > 1 ? 's' : '');
        if ($diff->i > 0) $parts[] = $diff->i . ' minute' . ($diff->i > 1 ? 's' : '');
        
        return implode(', ', $parts) ?: 'quelques secondes';
    }
}