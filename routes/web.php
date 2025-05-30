<?php

use App\Http\Controllers\AdvancedSearchController;
use App\Http\Controllers\AstuceController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CommentaireAstuceContoller;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MonProfileController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserSettingsController;
use App\Models\Astuce;
use App\Models\Categorie;
use App\Models\CommentaireAstuce;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Sitemap\SitemapGenerator;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/generate-sitemap', function () {
    SitemapGenerator::create('https://mascodeproduct.com')->writeToFile(public_path('sitemap.xml'));
    return 'Sitemap généré avec succès !';
});
Route::get('/auth/{provider}', [\App\Http\Controllers\Auth\OAuthController::class, 'redirectToProvider'])
    ->where('provider', 'google|github')
    ->name('oauth.login');

Route::get('/auth/{provider}/callback', [\App\Http\Controllers\Auth\OAuthController::class, 'handleProviderCallback'])
    ->where('provider', 'google|github');
    
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
});

Route::get('/sauvegardes', [BookmarkController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('saved.items');

Route::delete('/bookmarks/{bookmark}', [BookmarkController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('bookmarks.destroy');

/*Route::prefix('astuces')->name('astuces.')->middleware(['auth'])->controller(AstucesControllers::class)->group(function (){


    Route::get('/new','create')->name('new');

    Route::post('/new','store');

    Route::get('/user/{nom}-{astuce}','accueil')->where([
        'astuce'=>'[0-9]+',
    'nom'=>'[a-zA-Z0-9\-]+'
    ])->name('mesastuces');
    Route::get('/edit/{astuce}','edit')->name('editastuce');
    Route::post('/edit/{astuce}','update');
    Route::get('/news','creates')->name('newsans');

});*/

Route::middleware(['auth', 'verified'])->name('mon.')->group(function () {
    // Route pour la page d'édition du profil
    Route::get('/profile', [MonProfileController::class, 'edit'])->name('profile.edit');
    
    // Route pour la mise à jour du profil
    Route::patch('/profile', [MonProfileController::class, 'update'])->name('profile.update');
    
    // Route pour la mise à jour de l'avatar
    Route::post('/profile/avatar', [MonProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
});

Route::prefix('posts')->name('posts.')->controller(PostController::class)->group(function (){

    Route::get('/','index')->name('index');
    Route::get('/newpost', 'newpost')->name('newpost')->middleware(['auth']);
    Route::post('/posts', [PostController::class, 'save'])->middleware(['auth'])->name('store');
    Route::put('/posts/{post}/update-status', [PostController::class, 'updateStatus'])
    ->name('update-status');

    Route::get('/lire/{nom}','show')->where([
        'nom'=>'[a-zA-Z0-9\-]+'
    ])->name('show');

    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('edit');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('update');

});

Route::post('/posts/{post}/comments', [CommentaireController::class, 'store'])
    ->name('comments.store')
    ->middleware('auth');


    Route::post('/astuce/{astuce}/astuce-comments', [CommentaireAstuceContoller::class, 'store'])
    ->name('commentsastuces.store')
    ->middleware('auth');


Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');

Route::prefix('user')->name('user.')->controller(UserController::class)->group(function () {

   
    Route::get('/lire/{nom}','show')->where([
        'nom'=>'[a-zA-Z0-9\-]+'
    ])->name('show');



    //Route::get('/{nom}-{user}','showprofil')->where([
    //    'user'=>'[0-9]+',
    //'nom'=>'[a-zA-Z0-9\-]+'
    //])->name('profil');
    
    //Route::post('/lire/{nom}-{post}', 'commente');


    Route::get('/{post}', 'shows')->name('reaction');

    Route::get('/profile', function(){

    })->name("profil");
    //Route::get('/subscribe/{user}', 'subscribe')->name('subscribe');
    //Route::get('/unsubscribe/{user}', 'unsubscribe')->name('unsubscribe');
    //Route::get('/editp/{id}', 'EditEtat')->name('EditEtatpost');

    //Route::put{post}', 'updates')->name('posts.update');

    
    //Route::get('/comments/{user}', 'comments')->name('comments');


    //Route::get('/edit/{post}','edit')->name('editpost');

    //Route::post('/edit/{post}','update');

});

Route::middleware(['auth'])->group(function () {
    // Créer un commentaire
    Route::post('/commentaires', [CommentaireController::class, 'store'])->name('commentaires.store');
    Route::post('/commentairesastuces', [CommentaireAstuceContoller::class, 'store'])->name('commentairesastuces.store');
    
    // Supprimer un commentaire (soft delete)
    Route::delete('/commentaires/{commentaire}', [CommentaireController::class, 'destroy'])->name('commentaires.destroy');
});
Route::post('/likes/toggle', [LikeController::class, 'toggle'])
     ->middleware(['auth', 'verified']);

// routes/web.php
Route::middleware(['auth'])->group(function () {
    Route::delete('/post/{post}', [PostController::class, 'destroy'])->name('post.destroy');

    Route::resource('astuces', AstuceController::class)->except(['show','index']);
    Route::get('/previsualiser/{astuce}',[AstuceController::class, 'previsualiser'])->where([
        'nom'=>'[a-zA-Z0-9\-]+'
    ])->name("astuces.previsualiser");
    
    Route::post('/upload-image', [AstuceController::class, 'uploadImage'])->name('upload.image');
});
Route::get('/astuces/{astuce}', [AstuceController::class, 'show'])->name('astuces.show');
Route::get('/astuces', [AstuceController::class, 'index'])->name('astuces.index');

Route::post('/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');

/*Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});*/

Route::get('/forum', function () {
    return Inertia::render('Forum/Index', [
        'posts' => Post::with(['user', 'category', 'tags'])
                     ->orderBy('id', 'desc')
                     ->paginate(5),
        'recents' => Post::with('user')
                      ->orderBy('id', 'desc')
                      ->limit(3)
                      ->get()
    ]);
})->name('accueil');

Route::get('/tous' , [UserController::class,'recherche'])->name('tous');
Route::get('/search', [SearchController::class, 'search'])->name('search');
Route::get('/recherche-avancee', [AdvancedSearchController::class, 'index'])->name('advanced-search');

Route::get('/contact', function (){
    return Inertia::render("Contact");
})->name("contact");

Route::post('/contact',[UserController::class, "contacts"])->name("contacts");
// routes/web.php
Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');
Route::get('/newsletter/verify/{token}', [NewsletterController::class, 'verify'])->name('newsletter.verify');
// routes/web.php
Route::get('/newsletter/unsubscribe/{token}/{email}', [NewsletterController::class, 'unsubscribe'])
     ->name('newsletter.unsubscribe');
     
     Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/parametres', [UserSettingsController::class, 'edit'])->name('user-settings.edit');
        Route::put('/parametres', [UserSettingsController::class, 'update'])->name('user-settings.update');
    });

    
    Route::post('/bookmarks/toggle', [BookmarkController::class, 'toggle'])
    ->middleware(['auth', 'verified']);
require __DIR__.'/auth.php';
