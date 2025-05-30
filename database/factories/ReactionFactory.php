<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReactionFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'post_id' => \App\Models\Post::factory(),
            'reaction' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}