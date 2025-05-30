<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AstuceImageFactory extends Factory
{
    public function definition()
    {
        return [
            'astuce_id' => \App\Models\Astuce::factory(),
            'image_url' => $this->faker->imageUrl(),
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}