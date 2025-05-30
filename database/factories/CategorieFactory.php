<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategorieFactory extends Factory
{
    public function definition()
    {
        return [
            'titre' => $this->faker->words(3, true),
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
            'image' => $this->faker->imageUrl(),
            'couleur' => $this->faker->hexColor(),
            'status' => $this->faker->boolean(),
            'svg' => '<svg>...</svg>',
            'description' => $this->faker->paragraph(),
        ];
    }
}