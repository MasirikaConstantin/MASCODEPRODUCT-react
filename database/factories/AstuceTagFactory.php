<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AstuceTagFactory extends Factory
{
    public function definition()
    {
        return [
            'astuce_id' => \App\Models\Astuce::factory(),
            'tag_id' => \App\Models\Tag::factory(),
        ];
    }
}