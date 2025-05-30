<?php

namespace Database\Seeders;

use App\Models\Astuce;
use App\Models\Categorie;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class AstuceSeeder extends Seeder
{
    public function run()
    {
        $categories = Categorie::all();
        $tags = Tag::all();
        $users = User::all();

        Astuce::factory(20)->create()->each(function ($astuce) use ($categories, $tags, $users) {
            $astuce->update([
                'categorie_id' => $categories->random()->id,
                'user_id' => $users->random()->id,
            ]);

            $astuce->tags()->attach(
                $tags->random(rand(1, 4))->pluck('id')->toArray()
            );
        });
    }
}