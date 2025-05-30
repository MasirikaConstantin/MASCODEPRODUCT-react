<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Astuce;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Inertia\Inertia;

class AdvancedSearchController extends Controller
{
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'nullable|string|min:3',
            'type' => 'nullable|in:post,astuce,all',
            'author' => 'nullable|integer|exists:users,id',
            'difficulty' => 'nullable|in:facile,moyen,difficile',
            'has_video' => 'nullable|boolean',
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date|after_or_equal:date_from',
            'per_page' => 'nullable|integer|min:5|max:25',
            'page' => 'nullable|integer|min:1',
        ]);

        $validated = $validator->validated();
        $query = $validated['query'] ?? null;
        $type = $validated['type'] ?? 'all';
        $perPage = $validated['per_page'] ?? 15;
        $page = $validated['page'] ?? 1;

        // Structure de données par défaut
        $defaultResponse = [
            'results' => [],
            'total_posts' => 0,
            'total_astuces' => 0,
            'total_results' => 0,
            'filters' => $validated,
            'authors' => [],
            'error' => null
        ];

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                ...$defaultResponse
            ], 422);
        }

        try {
            // Récupération des auteurs
            $authors = User::whereHas('posts')->orWhereHas('astuces')
                ->select('id', 'name', 'image')
                ->get();

            // Base queries
            $postQuery = Post::with(['user:id,name,image', 'category:id,name'])
                ->where('etat', true)
                ->when($query, function($q) use ($query) {
                    $q->where(function($queryBuilder) use ($query) {
                        $queryBuilder->where('titre', 'like', "%{$query}%")
                                     ->orWhere('contenus', 'like', "%{$query}%");
                    });
                })
                ->when(isset($validated['author']), function($q) use ($validated) {
                    $q->where('user_id', $validated['author']);
                })
                ->when(isset($validated['has_video']), function($q) use ($validated) {
                    $validated['has_video'] 
                        ? $q->whereNotNull('video_url')
                        : $q->whereNull('video_url');
                })
                ->when(isset($validated['date_from']), function($q) use ($validated) {
                    $q->whereDate('created_at', '>=', $validated['date_from']);
                })
                ->when(isset($validated['date_to']), function($q) use ($validated) {
                    $q->whereDate('created_at', '<=', $validated['date_to']);
                });

            $astuceQuery = Astuce::with(['user:id,name,image', 'category:id,name'])
                ->where('etat', true)
                ->when($query, function($q) use ($query) {
                    $q->where(function($queryBuilder) use ($query) {
                        $queryBuilder->where('titre', 'like', "%{$query}%")
                                     ->orWhere('contenus', 'like', "%{$query}%");
                    });
                })
                ->when(isset($validated['author']), function($q) use ($validated) {
                    $q->where('user_id', $validated['author']);
                })
                ->when(isset($validated['difficulty']), function($q) use ($validated) {
                    $q->where('difficulty', $validated['difficulty']);
                })
                ->when(isset($validated['date_from']), function($q) use ($validated) {
                    $q->whereDate('created_at', '>=', $validated['date_from']);
                })
                ->when(isset($validated['date_to']), function($q) use ($validated) {
                    $q->whereDate('created_at', '<=', $validated['date_to']);
                });

            // Execute queries
            $results = collect();
            $totalPosts = 0;
            $totalAstuces = 0;

            if ($type === 'all' || $type === 'post') {
                $posts = $postQuery->orderBy('created_at', 'desc')->get();
                $totalPosts = $posts->count();
                $results = $results->merge($posts->map(function($post) {
                    return $this->formatPostResult($post);
                }));
            }

            if ($type === 'all' || $type === 'astuce') {
                $astuces = $astuceQuery->orderBy('created_at', 'desc')->get();
                $totalAstuces = $astuces->count();
                $results = $results->merge($astuces->map(function($astuce) {
                    return $this->formatAstuceResult($astuce);
                }));
            }

            // Sort and paginate manually
            $sortedResults = $results->sortByDesc('created_at_timestamp');
            $totalResults = $sortedResults->count();
            $paginatedResults = $sortedResults->forPage($page, $perPage)->values();

            $responseData = [
                'results' => $paginatedResults,
                'total_posts' => $totalPosts,
                'total_astuces' => $totalAstuces,
                'total_results' => $totalResults,
                'current_page' => $page,
                'per_page' => $perPage,
                'last_page' => ceil($totalResults / $perPage),
                'filters' => $validated,
                'authors' => $authors,
                'error' => null
            ];

            // Pour les requêtes AJAX
            if ($request->expectsJson()) {
                return response()->json($responseData);
            }

            // Pour Inertia
            return Inertia::render("AdvancedSearch", $responseData);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la recherche avancée: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            $errorResponse = [
                ...$defaultResponse,
                'error' => 'Une erreur est survenue lors de la recherche',
                'authors' => User::whereHas('posts')->orWhereHas('astuces')
                    ->select('id', 'name', 'image')->get()
            ];

            if ($request->expectsJson()) {
                return response()->json($errorResponse, 500);
            }

            return Inertia::render("AdvancedSearch", $errorResponse);
        }
    }

    private function formatPostResult($post)
    {
        return [
            'type' => 'post',
            'id' => $post->id,
            'title' => $post->titre ?? '',
            'slug' => $post->slug ?? '',
            'excerpt' => Str::limit(strip_tags($post->contenus ?? ''), 100),
            'image' => $post->image ?? null,
            'video_url' => $post->video_url ?? null,
            'published_at' => $post->created_at ? $post->created_at->format('d/m/Y') : null,
            'created_at_timestamp' => $post->created_at ? $post->created_at->timestamp : 0,
            'user' => [
                'id' => optional($post->user)->id,
                'name' => optional($post->user)->name ?? 'Utilisateur inconnu',
                'avatar' => optional($post->user)->image ?? '/images/default-avatar.png',
            ],
            'has_image' => !empty($post->image),
            'has_video' => !empty($post->video_url),
        ];
    }

    private function formatAstuceResult($astuce)
    {
        return [
            'type' => 'astuce',
            'id' => $astuce->id,
            'title' => $astuce->titre ?? '',
            'slug' => $astuce->slug ?? '',
            'excerpt' => Str::limit(strip_tags($astuce->contenus ?? ''), 100),
            'image' => $astuce->image ?? null,
            'published_at' => $astuce->created_at ? $astuce->created_at->format('d/m/Y') : null,
            'created_at_timestamp' => $astuce->created_at ? $astuce->created_at->timestamp : 0,
            'user' => [
                'id' => optional($astuce->user)->id,
                'name' => optional($astuce->user)->name ?? 'Utilisateur inconnu',
                'avatar' => optional($astuce->user)->image ?? '/images/default-avatar.png',
            ],
            'has_image' => !empty($astuce->image),
            'difficulty' => $astuce->difficulty ?? 'moyen',
        ];
    }
}