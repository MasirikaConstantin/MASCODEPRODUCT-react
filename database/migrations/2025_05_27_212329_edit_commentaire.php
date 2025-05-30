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
        Schema::table('commentaireastuces', function (Blueprint $table) {
            $table->softDeletes();  
          // Ajout du système de réponse aux commentaires
          $table->foreignId('parent_id')
          ->nullable()
          ->constrained('commentaireastuces')
          ->cascadeOnDelete();
    
            // Index pour optpostimiser les requêtes
            $table->index(['astuce_id', 'parent_id']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
