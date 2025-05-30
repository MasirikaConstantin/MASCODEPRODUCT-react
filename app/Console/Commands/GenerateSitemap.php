<?php

namespace App\Console\Commands;
use Spatie\Sitemap\SitemapGenerator;
use Illuminate\Console\Command;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-sitemap';
    protected $description = 'Génère le sitemap du site';

    /**
     * The console command description.
     *
     * @var string
     */

    /**
     * Execute the console command.
     */
    public function handle()
    {
        SitemapGenerator::create('https://mascodeproduct.com')->writeToFile(public_path('sitemap.xml'));
        $this->info('Sitemap généré avec succès.');
    }
}
