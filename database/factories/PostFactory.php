<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition()
    {
        return [
            'titre' => $this->faker->sentence(),
            'contenus' => $this->faker->paragraphs(5, true),
            'user_id' => \App\Models\User::inRandomOrder()->first()->id,
            'categorie_id' => \App\Models\Categorie::inRandomOrder()->first()->id,
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
            'photo' => $this->faker->imageUrl(),
            'image' => $this->faker->imageUrl(),
            'codesource' => $this->faker->randomHtml(),
            'slug' => $this->faker->slug(),
            'views_count' => $this->faker->numberBetween(0, 1000),
            'etat' => $this->faker->boolean(80), // 80% chance d'être true
        ];
    }
}