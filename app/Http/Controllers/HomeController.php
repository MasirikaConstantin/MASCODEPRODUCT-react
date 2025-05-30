<?php

namespace App\Http\Controllers;

use App\Models\Astuce;
use App\Models\Categorie;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
{
    // Récupération des posts paginés avec les counts
    $posts = Post::with(['categorie', 'user'])
        ->withCount(['comments', 'likes', 'views'])
        ->orderBy("id", 'desc')
        ->where('etat', true)
        ->paginate(8);
    
    // Récupération des posts récents avec les counts
    $recents = Post::with(['categorie', 'user'])
        ->withCount(['comments', 'likes', 'views'])
        ->orderBy('id', 'desc')
        ->where('etat', true)
        ->limit(3)
        ->get();
    
    // Récupération des astuces avec les counts
    $astuces = Astuce::with(['category', 'user'])
        ->withCount(['comments', 'likes', 'views'])
        ->orderBy('id', 'desc')
        ->where('etat', true)
        ->paginate(6);
    
    // Récupération des catégories
    $categories = Categorie::where('status', 1)
        ->orderBy('titre', 'asc')
        ->get();
    
    // Transformation des données avec les statistiques
    $posts->getCollection()->transform(function ($post) {
        $post->stats = [
            'comments_count' => $post->comments_count,
            'likes_count' => $post->likes_count,
            'views_count' => $post->views_count,
        ];
        return $post;
    });

    $astuces->getCollection()->transform(function ($astuce) {
        $astuce->stats = [
            'comments_count' => $astuce->comments_count,
            'likes_count' => $astuce->likes_count,
            'views_count' => $astuce->views_count,
        ];
        return $astuce;
    });
    
    $recents->transform(function ($recent) {
        $recent->stats = [
            'comments_count' => $recent->comments_count,
            'likes_count' => $recent->likes_count,
            'views_count' => $recent->views_count,
        ];
        return $recent;
    });
    return Inertia::render('Welcome', [
        'posts' => $posts,
        'recents' => $recents,
        'astuces' => $astuces,
        'categories' => $categories
    ]);
}
}
