<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommentaireAstuceFactory extends Factory
{
    public function definition()
    {
        return [
            'contenus' => $this->faker->paragraph(),
            'codesource' => $this->faker->randomHtml(),
            'user_id' => \App\Models\User::factory(),
            'astuce_id' => \App\Models\Astuce::factory(),
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}