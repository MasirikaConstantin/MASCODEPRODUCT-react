<?php

namespace App\Http\Controllers;

use App\Http\Requests\AstuceRequest;
use App\Models\Astuce;
use App\Models\Categorie;
use App\Models\Tag;
use App\Models\User;
use App\Models\ViewAstuce;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Str;

class AstuceController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request)
    {
        $query = Astuce::query()->with(['user', 'categorie']);
    
        // Recherche par titre (avec debounce côté front)
        if ($request->has('titre') && $request->titre !== '') {
            $query->where('titre', 'like', "%{$request->titre}%");
        }
    
        // Recherche dans le contenu (avec debounce côté front)
        if ($request->has('contenus') && $request->contenus !== '') {
            $query->where('contenus', 'like', "%{$request->contenus}%");
        }
    
        // Filtre par catégorie (déclenché immédiatement)
        if ($request->has('categorie_id') && $request->categorie_id !== '') {
            $query->where('categorie_id', $request->categorie_id);
        }
    
        // Seulement les astuces publiées
        $query->where('etat', 1);
    
        // Tri par défaut (le plus récent)
        $query->orderByDesc('created_at');
    
        // Pagination avec 12 éléments par page pour mieux s'adapter au grid
        $astuces = $query->paginate(12);
    
        return Inertia::render('Astuces/Index', [
            'astuces' => $astuces,
            'categories' => Categorie::where("status", true)->select('id', 'titre')->get(),
            'filters' => $request->only(['titre', 'contenus', 'categorie_id'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Astuces/Create', [
            'categories' => Categorie::where('status', true)
                ->select('id', 'titre', 'description', 'couleur', 'image', 'svg')
                ->get(),
            'tags' => Tag::where('status', true)
                ->orderBy('nom', 'asc')
                ->select('id', 'nom')
                ->get(),
        ]);
    }

    public function store(AstuceRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $data['slug'] = \Str::slug($data['titre'] . '-' . time());

        // Gestion de l'upload d'image
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('imageastuces', 'public');
        }

        // Validation de l'URL vidéo YouTube
        if (!empty($data['video']) && !str_contains($data['video'], 'https://www')) {
            return back()->withErrors(['video' => "Le lien n'est pas de YouTube"]);
        }

        $astuce = Astuce::create($data);
        
        if (isset($data['tags'])) {
            $astuce->tags()->sync($data['tags']);
        }

        return redirect()->route('astuces.index')
            ->with('success', 'Astuce créée avec succès');
    }

    public function show(string $astuce)
    {
        $astuce = Astuce::where('slug', $astuce)
            ->where('etat', true)
            ->firstOrFail();
        // Vérifier si cette vue n'a pas déjà été enregistrée récemment
            $recentView = ViewAstuce::where('astuce_id', $astuce->id)
            ->when(auth()->check(), function ($query) {
                $query->where('user_id', auth()->id());
            }, function ($query) {
                $query->where('ip_address', request()->ip());
            })
            ->where('created_at', '>', now()->subHour())
            ->exists();

            if (!$recentView) {
            ViewAstuce::create([
                'astuce_id' => $astuce->id,
                'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'user_id' => auth()->id(),
        ]);
        }
        /*$astuce->load(['user' => function($query) {
            $query->withCount('astuces'); // Cela ajoutera une propriété `astuces_count` au modèle User
        }, 'categorie', 'tags', 'comments.user'])->loadCount('comments', 'likes', 'views');
        ;*/
        $astuce->load([
            'user',
            'tags',
            'likes',
           "categorie",
           'bookmarks',

        ])->loadCount('comments', 'likes', 'views');
        
        // Charger les commentaires racines avec leurs réponses récursivement
        $comments = $astuce->comments()
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
        $astucesLiees = Astuce::query()
        ->where('etat', true)
        ->where('id', '!=', $astuce->id)
        ->where('categorie_id', $astuce->categorie_id)
        ->with(['user', 'tags'])
        ->withCount('comments', 'likes')
        ->inRandomOrder()
        ->limit(3)
        ->get();

        return Inertia::render('Astuces/Show', [

            'astuce' => [
                'id' => $astuce->id,
                'title' => $astuce->titre,
                'slug' => $astuce->slug,
                'contenus' => $astuce->contenus, 
                'categorie_id' => $astuce->categorie_id, 
                'codesource' => $astuce->codesource,
                "created_at" => $astuce->created_at->diffForHumans(),
                'image' => $astuce->imageUrl(),
                'video_url' => $astuce->video_url,
                "meta" => Str::limit(strip_tags($astuce->contenus), 160),
                'published_at' => [
                    'formatted' => $astuce->published_at?->format('d M Y'),
                    'datetime' => $astuce->published_at?->toISOString(),
                ],
                "categorie"=>[
                    "id"=>$astuce->categorie->id,
                    "titre"=>$astuce->categorie->titre,
                    "couleur"=>$astuce->categorie->couleur
                ],
                'stats' => [
                    'comments_count' => $astuce->comments_count,
                    'likes_count' => $astuce->likes_count,
                    'views_count' => $astuce->views_count,
                ],
                'is_bookmarked' => $astuce->bookmarks->isNotEmpty(),

                'author' => [
                    'id' => $astuce->user->id,
                    'name' => $astuce->user->name,
                    'username' => $astuce->user->username,
                    'image' => $astuce->user->image,
                    'bio' => $astuce->user->bio,
                ],
                'tags' => $astuce->tags->map(fn ($tag) => [
                    'id' => $tag->id,
                    'name' => $tag->nom,
                    'slug' => $tag->slug,
                ]),
                'comments' => $this->formatComments($comments),
                'has_liked' => auth()->check() ? $astuce->likes->contains('user_id', auth()->id()) : false,
                'all_comments_count' => $astuce->comments_count,
                'astucesLiees' => $astucesLiees->map(function ($related) {
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
                'comments_count' => $astuce->comments_count,
            ],
            /*'astuce' => $astuce,
            'comments_count' => $astuce->comments_count,
            'comments' => $this->formatComments($comments),

            'astucesLiees' => $astucesLiees*/
        ]);
    }
    private function formatComments($comments)
    {
        return $comments->map(function ($comment) {
            $formattedComment = [
                'id' => $comment->id,
                'contenus' => $comment->contenus,
                'astuce_id' => $comment->astuce_id,
                'created_at' => $comment->created_at->diffForHumans(),
                'user' => [
                    'id' => $comment->user->id,
                    'name' => $comment->user->name,
                    'image' => $comment->user->image,
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
    
    public function edit(string $astuce)
    {
        $astuce = Astuce::where('slug', $astuce)
            ->where('etat', true)
            ->firstOrFail();

        $this->authorize('update', $astuce);

        return Inertia::render('Astuces/Edit', [
            'astuce' => $astuce->load('tags'),
            'categories' => Categorie::where('status', true)
                ->select('id', 'titre', 'description', 'couleur', 'image', 'svg')
                ->get(),
            'tags' => Tag::where('status', true)
                ->orderBy('nom', 'asc')
                ->select('id', 'nom')
                ->get(),
        ]);
    }

    public function update(AstuceRequest $request, Astuce $astuce)
    {
        $this->authorize('update', $astuce);
    
        $data = $request->validated();
        $data['slug'] = \Str::slug($data['titre'] . '-' . $astuce->id);
    
        // Gestion de l'image
        if ($request->boolean('remove_image')) {
            // Supprimer l'ancienne image si elle existe
            if ($astuce->image) {
                Storage::disk('public')->delete($astuce->image);
            }
            $data['image'] = null;
        } elseif ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($astuce->image) {
                Storage::disk('public')->delete($astuce->image);
            }
            // Stocker la nouvelle image
            $data['image'] = $request->file('image')->store('imageastuces', 'public');
        } else {
            // Garder l'ancienne image - ne pas modifier le champ
            unset($data['image']);
        }
    
        // Validation de l'URL vidéo YouTube
        if (!empty($data['video']) && !str_contains($data['video'], 'https://www.youtube.com/')) {
            return back()->withErrors(['video' => "Le lien doit provenir de YouTube"]);
        }
    
        $astuce->update($data);
        
        if (isset($data['tags'])) {
            $astuce->tags()->sync($data['tags']);
        }
    
        return redirect()->route('dashboard')
            ->with('success', 'Astuce mise à jour avec succès');
    }

    public function destroy(Astuce $astuce)
    {
        $this->authorize('delete', $astuce);

        if ($astuce->image) {
            Storage::disk('public')->delete($astuce->image);
        }

        $astuce->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Astuce supprimée avec succès');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048'
        ]);

        $path = $request->file('image')->store('editor-images', 'public');
        
        return response()->json([
            'success' => true,
            'url' => Storage::url($path)
        ]);
    }

    public function previsualiser(string $astuce){
        $lastuce =Astuce::where("slug",$astuce)->with(["user",'tags'])->firstOrFail();
        if(Auth::user()){
            if (Auth::user()->id != $lastuce->user_id) {
                abort(404); // Retourne une erreur 404
                }
        }else{
            abort(404); // Retourne une erreur 404

        }
    if ($lastuce->slug != $astuce) {
        return to_route('index');
    }
        return Inertia::render('Astuces/Previsualiser',[
            'astuce'=>$lastuce,
            'ast1'=>Astuce::where("id",'<>',$lastuce->id)->with('users')->where('categorie_id',$lastuce->categorie_id)->where('etat',true)->get(),
            'commentaires'=> $lastuce->comments()->with(["user"])->orderBy('created_at', 'desc')->paginate(5),
        ]);
    }

    
}