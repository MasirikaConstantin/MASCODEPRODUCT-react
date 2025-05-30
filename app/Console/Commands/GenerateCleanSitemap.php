<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateCleanSitemap extends Command
{
    protected $signature = 'app:generate-clean-sitemap';
    protected $description = 'Génère un sitemap basé uniquement sur les routes Laravel existantes';

    public function handle()
    {
        $sitemap = Sitemap::create();

        foreach (Route::getRoutes() as $route) {
            if (
                in_array('GET', $route->methods()) &&
                $route->getName() &&
                !str_contains($route->uri(), 'admin') && // facultatif : pour exclure des routes admin
                !str_contains($route->uri(), 'api')     // facultatif : pour exclure l'API
            ) {
                try {
                    $url = route($route->getName());
                    $sitemap->add(Url::create($url));
                } catch (\Exception $e) {
                    // ignore les routes invalides
                }
            }
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('✅ Sitemap généré à partir des routes Laravel.');
    }
}
