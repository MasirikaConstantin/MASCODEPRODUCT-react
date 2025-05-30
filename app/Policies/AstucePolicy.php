<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Astuce;
use Illuminate\Auth\Access\HandlesAuthorization;

class AstucePolicy
{
    use HandlesAuthorization;

    public function view(User $user, Astuce $astuce)
    {
        return $astuce->etat || $user->id === $astuce->user_id;
    }

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user, Astuce $astuce)
    {
        return $user->id === $astuce->user_id;
    }

    public function delete(User $user, Astuce $astuce)
    {
        return $user->id === $astuce->user_id;
    }
}