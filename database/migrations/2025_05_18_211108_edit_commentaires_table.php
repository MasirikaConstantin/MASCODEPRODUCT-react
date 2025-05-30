<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('commentaires', function (Blueprint $table) {
        $table->softDeletes();  
          // Ajout du système de réponse aux commentaires
          $table->foreignId('parent_id')
          ->nullable()
          ->constrained('commentaires')
          ->cascadeOnDelete();
    
            // Index pour optimiser les requêtes
            $table->index(['post_id', 'parent_id']);
            $table->index(['user_id', 'created_at']);
        });       // Ajout des suppressions douces
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        //Schema::dropIfExists('commentaires');
    }
};
