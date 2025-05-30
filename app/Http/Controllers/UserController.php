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
            ->with('user:id,name,avatar') // Charge la relation user avec seulement id, name, username
            ->latest()
            ->take(5)
            ->get(['id', 'titre', 'slug', 'created_at', 'user_id','image',"contenus"]) // Ajoutez user_id
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->titre,
                    'slug' => $post->slug,
                    "excerpt"=>Str::limit(strip_tags($post->contenus), 200),
                    'image'=> $post->imageUrl(),
                    'avatar'=> $post->imageUrl(),
                    'author' => $post->user ? $post->user : 'Utilisateur inconnu', // Gestion du cas null
                    
                    'published_at' => $post->created_at->diffForHumans(),
                ];
        });
        
   
        
        // Récupération des commentaires paginés avec leurs relations
        $comments = $user->comments()
            ->with([
                'user:id,name,username,avatar',
                'post:id,titre,slug',
                'replies' => function ($query) {
                    $query->with('user:id,name,username,avatar')
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
                        'username' => $comment->user->username,
                        'avatar' => $comment->user->avatar,
                    ],
                    'replies' => $comment->replies->map(function ($reply) {
                        return [
                            'id' => $reply->id,
                            'content' => $reply->contenus,
                            'created_at' => $reply->created_at->diffForHumans(),
                            'user' => [
                                'id' => $reply->user->id,
                                'name' => $reply->user->name,
                                'username' => $reply->user->username,
                                'avatar' => $reply->user->avatar,
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
                'username' => $user->username,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'bio' => $user->bio,
                'website' => $user->website,
                'birthdate' => $user->birthdate?->format('Y-m-d'),
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
                    'username' => auth()->user()->username,
                    'avatar' => auth()->user()->avatar,
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
