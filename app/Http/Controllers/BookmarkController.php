<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BookmarkController extends Controller
{

    public function toggle(Request $request)
{
    $validated = $request->validate([
        'bookmarkable_id' => 'required|integer',
        'bookmarkable_type' => [
            'required',
            'string',
            Rule::in(['App\Models\Post', 'App\Models\Astuce']),
        ],
    ]);

    // Normalisez le type
    $validated['bookmarkable_type'] = str_replace('\\\\', '\\', $validated['bookmarkable_type']);

    $user = $request->user();
    $existing = Bookmark::where('user_id', $user->id)
                      ->where('bookmarkable_id', $validated['bookmarkable_id'])
                      ->where('bookmarkable_type', $validated['bookmarkable_type'])
                      ->first();

    if ($existing) {
        $existing->delete();
        return back()->with('success', 'Bookmark retiré');
    }

    Bookmark::create([
        'user_id' => $user->id,
        'bookmarkable_id' => $validated['bookmarkable_id'],
        'bookmarkable_type' => $validated['bookmarkable_type'],
    ]);

    return back()->with('success', 'Bookmark ajouté');
}
    public function index(Request $request)
    {
        $bookmarks = $request->user()->bookmarks()
            ->with(['bookmarkable' => function($query) {
                $query->with('user');
            }])
            ->latest()
            ->paginate(10);

        return Inertia::render('Bookmarks/Index', [
            'bookmarks' => $bookmarks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bookmarkable_id' => 'required|integer',
            'bookmarkable_type' => 'required|in:App\Models\Post,App\Models\Astuce'
        ]);


        $request->user()->bookmarks()->firstOrCreate([
            'bookmarkable_id' => $validated['bookmarkable_id'],
            'bookmarkable_type' => $validated['bookmarkable_type']
        ]);

        return back()->with('success', 'Contenu sauvegardé !');
    }

    public function destroy(Bookmark $bookmark)
    {
        // Vérifie que l'utilisateur peut supprimer ce bookmark
        if (auth()->id() !== $bookmark->user_id) {
            abort(403);
        }

        $bookmark->delete();

        return back()->with('success', 'Bookmark supprimé !');
    }
}