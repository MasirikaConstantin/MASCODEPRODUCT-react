<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ProprieteContactMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show(User $user)
    {
        $user->loadCount(['comments', 'likes', 'posts']);

        $posts = $user->posts()
            ->with('user:id,name,image') // Charge la relation user avec seulement id, name, username
            ->latest()
            ->take(5)
            ->get(['id', 'titre', 'slug', 'created_at', 'user_id','image',"contenus"]) // Ajoutez user_id
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->titre,
                    'slug' => $post->slug,
                    "excerpt"=>Str::limit(strip_tags($post->contenus), 200),
                    'image'=> $post->imageUrl() ?:null,
                    'avatar'=> $post->imageUrl() ?:null,
                    'author' =>  [
                        'id' => $post->user->id,
                        'name' => $post->user->name,
                        'avatar' => $post->user->imageUrl() ?:null,
                    ], // Gestion du cas null
                    
                    'published_at' => $post->created_at->diffForHumans(),
                ];
        });
        
   
        
        // Récupération des commentaires paginés avec leurs relations
        $comments = $user->comments()
            ->with([
                'user:id,name,image',
                'post:id,titre,slug',
                'replies' => function ($query) {
                    $query->with('user:id,name,image')
                          ->latest()
                          ->limit(3);
                },
                'likes' => function ($query) {
                    $query->select('id', 'user_id', 'likeable_id', 'likeable_type');
                }
            ])
            ->withCount(['replies', 'likes'])
            ->latest()
            ->paginate(10)
            ->through(function ($comment) {
                return [
                    'id' => $comment->id,
                    'content' => $comment->contenus,
                    'created_at' => $comment->created_at->diffForHumans(),
                    'post' => [
                        'id' => $comment->post->id,
                        'title' => Str::limit($comment->post->titre,50),
                        'slug' => $comment->post->slug,
                    ],
                    'user' => [
                        'id' => $comment->user->id,
                        'name' => $comment->user->name,
                        'avatar' => $comment->user->imageUrl() ?:null,
                    ],
                    'replies' => $comment->replies->map(function ($reply) {
                        return [
                            'id' => $reply->id,
                            'content' => $reply->contenus,
                            'created_at' => $reply->created_at->diffForHumans(),
                            'user' => [
                                'id' => $reply->user->id,
                                'name' => $reply->user->name,
                                'avatar' => $reply->user->imageUrl() ?:null,
                            ],
                        ];
                    }),
                    'replies_count' => $comment->replies_count,
                    'likes_count' => $comment->likes_count,
                    'has_liked' => $comment->likes->contains('user_id', auth()->id()),
                ];
            });

        return Inertia::render('Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->imageUrl() ?:null,
                'created_at' => $user->created_at->diffForHumans(),
                'deleted_at' => $user->deleted_at,
                'comments_count' => $user->comments_count,
                'likes_count' => $user->likes_count,
                'posts_count' => $user->posts_count,
            ],
            'comments' => $comments,
            'auth' => [
                'user' => auth()->user() ? [
                    'id' => auth()->id(),
                    'name' => auth()->user()->name,
                    'avatar' => auth()->user()->imageUrl() ?:null,
                ] : null
                ],
                'posts' => $posts,
        ]);
    }

    public function contacts ( ContactRequest $request) {
        Mail::send(new ProprieteContactMail( $request->validated()));
        return back()->with('success', 'Votre message a était bien envoyé');
    }
}
