<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TagFactory extends Factory
{
    public function definition()
    {
        return [
            'nom' => $this->faker->word(),
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
            'status' => $this->faker->boolean(),
            'couleur' => $this->faker->hexColor(),
        ];
    }
}