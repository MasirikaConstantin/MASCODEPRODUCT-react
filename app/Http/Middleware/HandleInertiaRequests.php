<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
{
    $translations = [];
    $locale = app()->getLocale();
    $path = lang_path("{$locale}.json");

    try {
        if (file_exists($path)) {
            $translations = json_decode(file_get_contents($path), true) ?? [];
        }
    } catch (\Exception $e) {
        report($e);
    }

    $user = $request->user();

    return [
        ...parent::share($request),
        'auth' => [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->imageUrl() ?? null,
                'created_at' => $user->created_at?->diffForHumans(),
                'deleted_at' => $user->deleted_at,
                'comments_count' => $user->comments_count,
                'likes_count' => $user->likes_count,
                'posts_count' => $user->posts_count,
            ] : null,
        ],
        'flash' => [
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
        ],
        'translations' => $translations,
    ];
}

}
