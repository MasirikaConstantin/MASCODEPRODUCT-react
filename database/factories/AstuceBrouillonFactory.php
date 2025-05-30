<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AstuceBrouillonFactory extends Factory
{
    public function definition()
    {
        return [
            'titre' => $this->faker->sentence(),
            'contenus' => $this->faker->paragraphs(2, true),
            'slug' => $this->faker->slug(),
            'video' => 'https://www.youtube.com/watch?v='.$this->faker->regexify('[A-Za-z0-9]{10}'),
            'image' => $this->faker->imageUrl(),
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}