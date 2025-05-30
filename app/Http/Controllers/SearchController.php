<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Astuce;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        try {
            $query = $request->input('query');
            
            if (empty($query) || strlen($query) < 3) {
                return response()->json(['results' => []]);
            }
            
            // Recherche dans les posts
            $posts = Post::with(['user', 'category'])
                ->where('etat', true)
                ->where(function($q) use ($query) {
                    $q->where('titre', 'like', "%{$query}%")
                      ->orWhere('contenus', 'like', "%{$query}%");
                })
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function($post) {
                    return [
                        'type' => 'post',
                        'id' => $post->id,
                        'title' => $post->titre,
                        'slug' => $post->slug,
                        'excerpt' => Str::limit(strip_tags($post->contenus), 100),
                        'image' => $post->image ?? null,
                        'video_url' => $post->video_url ?? null,
                        'published_at' => $post->created_at ? $post->created_at->format('d/m/Y') : null,
                        'created_at_timestamp' => $post->created_at ? $post->created_at->timestamp : 0, // Pour le tri
                        'user' => [
                            'id' => optional($post->user)->id,
                            'name' => optional($post->user)->name ?? 'Utilisateur inconnu',
                            'avatar' => optional($post->user)->image ?? '/images/default-avatar.png',
                        ],
                        'has_image' => !empty($post->image),
                        'has_video' => !empty($post->video_url),
                    ];
                });
            
            // Recherche dans les astuces
            $astuces = Astuce::with(['user', 'category'])
                ->where('etat', true)
                ->where(function($q) use ($query) {
                    $q->where('titre', 'like', "%{$query}%")
                      ->orWhere('contenus', 'like', "%{$query}%");
                })
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function($astuce) {
                    return [
                        'type' => 'astuce',
                        'id' => $astuce->id,
                        'title' => $astuce->titre,
                        'slug' => $astuce->slug,
                        'excerpt' => Str::limit(strip_tags($astuce->contenus), 100),
                        'image' => $astuce->image ?? null,
                        'published_at' => $astuce->created_at ? $astuce->created_at->format('d/m/Y') : null,
                        'created_at_timestamp' => $astuce->created_at ? $astuce->created_at->timestamp : 0, // Pour le tri
                        'user' => [
                            'id' => optional($astuce->user)->id,
                            'name' => optional($astuce->user)->name ?? 'Utilisateur inconnu',
                            'avatar' => optional($astuce->user)->image ?? '/images/default-avatar.png',
                        ],
                        'has_image' => !empty($astuce->image),
                    ];
                });
            
            // Fusionner et trier les résultats
            $results = collect($posts->toArray())
                ->merge($astuces->toArray())
                ->sortByDesc('created_at_timestamp') // Trier par timestamp
                ->values()
                ->take(10)
                ->map(function($item) {
                    unset($item['created_at_timestamp']); // Supprimer le timestamp du résultat final
                    return $item;
                })
                ->all();
                
            return response()->json(['results' => $results]);
            
        } catch (\Exception $e) {
            Log::error('Erreur lors de la recherche: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json(['error' => 'Erreur lors de la recherche'], 500);
        }
    }
}