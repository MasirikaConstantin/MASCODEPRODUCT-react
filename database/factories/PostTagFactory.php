<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostTagFactory extends Factory
{
    public function definition()
    {
        return [
            'post_id' => \App\Models\Post::factory(),
            'tag_id' => \App\Models\Tag::factory(),
        ];
    }
}