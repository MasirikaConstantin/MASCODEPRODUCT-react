<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostValidate;
use Illuminate\Support\Str;
use App\Models\Categorie;
use App\Models\Post;
use App\Models\Tag;
use App\Models\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PostController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    return Inertia::render('Forum/Index', [
        'posts' => Post::with(['user', 'category', 'tags'])
                     ->orderBy('id', 'desc')
                     ->paginate(5),
        'recents' => Post::with('user')
                      ->orderBy('id', 'desc')
                      ->limit(3)
                      ->get()
    ]);
}

    public function updateStatus(Post $post)
    {

        $post->update(['etat' => request('etat')]);
        
        return back()->with('success', 'Statut du post mis à jour');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function newpost()
    {
        return inertia('Posts/Create', [
            'categories' => Categorie::all(),
            'tags' => Tag::all()
        ]);
    }

    public function save(PostValidate $request)
    {
        try {
            $post = Post::create($this->extractData(new Post(), $request));
            $post->tags()->sync($request->validated('tags'));

            return redirect()->route('dashboard')->with([
                'success' => 'Blog publié avec succès !',
                'post_id' => $post->id
            ]);
        } catch (\Exception $e) {
            return back()->withInput()->with([
                'error' => 'Une erreur est survenue lors de la création du post',
                'debug' => config('app.debug') ? $e->getMessage() : null
            ]);
        }
    }
    
    private function extractData(Post $post, PostValidate $request)
    {
        $data = $request->validated();
        
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $data['image'] = $request->file('image')->store("imagePost", 'public');
        }

        return $data;
    }
    /**
     * Display the specified resource.
     */
    
    public function show(string $nom)
    {
        $post = Post::where('slug', $nom)->firstOrFail();
        // Charger les relations nécessaires de façon optimisée
        $post->load([
            'user',
            'bookmarks',
            'tags',
            'likes',
           "categorie"
        ])->loadCount('comments', 'likes', 'views');

        

        // Incrémentation des vues si nécessaire
        if (Auth::user() && $post->user_id != Auth::id()) {
            $post->increment('views_count');
        }
        // Enregistrer la vue
        $recentView = View::where('post_id', $post->id)
        ->when(auth()->check(), function ($query) {
            $query->where('user_id', auth()->id());
        }, function ($query) {
            $query->where('ip_address', request()->ip());
        })
        ->where('created_at', '>', now()->subHour())
        ->exists();
    
        if (!$recentView) {
        View::create([
            'post_id' => $post->id,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'user_id' => auth()->id(),
        ]);
        }

        // Charger les commentaires racines avec leurs réponses récursivement
        $comments = $post->comments()
            ->whereNull('parent_id')
            ->with([
                'user',
                'likes',
                'replies.user',
                'replies.likes',
                'replies.replies.user',
                'replies.replies.likes',
                'replies.replies.replies.user', // Supporte jusqu'à 3 niveaux d'imbrication
            ])
            ->withCount(['likes', 'replies'])
            ->latest()
            ->get();

        // Articles similaires (par tags)
        $relatedPosts = Post::query()
            ->where('etat', true)
            ->where('id', '!=', $post->id)
            ->where('categorie_id', $post->categorie_id)
            ->with(['user', 'tags'])
            ->withCount('comments', 'likes')
            ->inRandomOrder()
            ->limit(3)
            ->get();
        return Inertia::render('Posts/Show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->titre,
                'slug' => $post->slug,
                'contenus' => $post->contenus, 
                'categorie_id' => $post->categorie_id, 
                'codesource' => $post->codesource,
                'image' => $post->imageUrl(),
                'video_url' => $post->video_url,
                "meta" => Str::limit(strip_tags($post->contenus), 160),
                'published_at' => [
                    'formatted' => $post->published_at?->format('d M Y'),
                    'datetime' => $post->published_at?->toISOString(),
                ],
                "categorie"=>[
                    "id"=>$post->categorie->id,
                    "titre"=>$post->categorie->titre,
                    "couleur"=>$post->categorie->couleur
                ],
                'stats' => [
                    'comments_count' => $post->comments_count,
                    'likes_count' => $post->likes_count,
                    'views_count' => $post->views_count,
                ],
                'author' => [
                    'id' => $post->user->id,
                    'name' => $post->user->name,
                    'image' => $post->user->imageUrl() ?:null,
                ],
                'tags' => $post->tags->map(fn ($tag) => [
                    'id' => $tag->id,
                    'name' => $tag->nom,
                    'slug' => $tag->slug,
                ]),
                'comments' => $this->formatComments($comments),
                'has_liked' => auth()->check() ? $post->likes->contains('user_id', auth()->id()) : false,
                'is_bookmarked' => $post->bookmarks->isNotEmpty(),
                'all_comments_count' => $post->comments_count,
                'related_posts' => $relatedPosts->map(function ($related) {
                    return [
                        'id' => $related->id,
                        'title' => $related->titre,
                        'slug' => $related->slug,
                        'excerpt' => str()->limit(strip_tags($related->contenus), 150),
                        'published_at' => $related->published_at?->format('d M Y'),
                        'image' => $related->imageUrl() ?: null,
                        'author' => [
                            'id' => $related->user->id,
                            'name' => $related->user->name,
                            'username' => $related->user->username,
                            'image' => $related->user->image,
                            'bio' => $related->user->bio,
                        ],
                        'tags' => $related->tags->map(function ($tag) {
                            return [
                                'id' => $tag->id,
                                'name' => $tag->nom,
                            ];
                        })->toArray(),
                    ];
                }),
                'comments_count' => $post->comments_count,
            ],
        ]);
    }
// Méthode pour formatter les commentaires de façon récursive
private function formatComments($comments)
{
    return $comments->map(function ($comment) {
        $formattedComment = [
            'id' => $comment->id,
            'contenus' => $comment->contenus,
            'post_id' => $comment->post_id,
            'created_at' => $comment->created_at->diffForHumans(),
            'user' => [
                'id' => $comment->user->id,
                'name' => $comment->user->name,
                'image' => $comment->user->imageUrl() ?:null,
            ],
            'stats' => [
                    'comments_count' => $comment->comments_count,
                    'likes_count' => $comment->likes_count,
                    'views_count' => $comment->views_count,
                ],
            'replies_count' => $comment->replies_count ?? $comment->replies->count(),
            'likes_count' => $comment->likes_count ?? $comment->likes->count(),
            'has_liked' => auth()->check() ? $comment->likes->contains('user_id', auth()->id()) : false,
        ];

        // Ajouter les réponses s'il y en a
        if ($comment->replies && $comment->replies->count() > 0) {
            $formattedComment['replies'] = $this->formatComments($comment->replies);
        } else {
            $formattedComment['replies'] = [];
        }

        return $formattedComment;
    });
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $post)
    {
        $post = Post::where('slug', $post)->firstOrFail();
        //dd($post);
        return inertia('Posts/Edit', [
            'post' => $post->load('tags'),
            'categories' => Categorie::all(),
            'tags' => Tag::all()
        ]);
    }

    public function update(PostValidate $request, Post $post)
    {
        try {
            $post->update($this->extractData($post, $request));
            $post->tags()->sync($request->validated('tags'));

            return redirect()->route('posts.show',["nom"=>$post->slug])->with([
                'success' => 'Post mis à jour avec succès !',
                'post_id' => $post->id
            ]);
        } catch (\Exception $e) {
            return back()->withInput()->with([
                'error' => 'Une erreur est survenue lors de la mise à jour du post',
                'debug' => config('app.debug') ? $e->getMessage() : null
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Post supprimée avec succès');
    }
}
