<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Post::factory(50)->create();

       // User::factory(10)->create();
        /*\App\Models\Categorie::factory(10)->create();
        \App\Models\Tag::factory(20)->create();
        \App\Models\Commentaire::factory(200)->create();
        \App\Models\Reaction::factory(300)->create();
        
        // Pour la table pivot post_tag
        \App\Models\Post::all()->each(function ($post) {
            $post->tags()->attach(
                \App\Models\Tag::all()->random(rand(1, 5))->pluck('id')->toArray()
            );
        });

        \App\Models\Astuce::factory(30)->create();
        
        // Création des brouillons
        \App\Models\AstuceBrouillon::factory(15)->create();
        
        // Ajout d'images aux astuces
        \App\Models\AstuceImage::factory(50)->create();
        
        // Ajout de tags aux astuces
        \App\Models\Astuce::all()->each(function ($astuce) {
            $astuce->tags()->attach(
                \App\Models\Tag::all()->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
        
        // Commentaires sur les astuces
        \App\Models\CommentaireAstuce::factory(100)->create();
        */
    }
}
