<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommentaireFactory extends Factory
{
    public function definition()
    {
        return [
            'contenus' => $this->faker->paragraph(),
            'user_id' => \App\Models\User::factory(),
            'post_id' => \App\Models\Post::factory(),
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}