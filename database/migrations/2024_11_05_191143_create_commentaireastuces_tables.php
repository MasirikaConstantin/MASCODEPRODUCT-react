<?php

use App\Models\Astuce;
use App\Models\Categorie;
use App\Models\User;
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
        //Schema::dropIfExists('commentaireastuces');

        Schema::create('commentaireastuces', function (Blueprint $table) {
            $table->id();
            $table->longText('contenus');
            $table->longText('codesource')->nullable();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Astuce::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
        




    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commentaireastuces');
    }
};
