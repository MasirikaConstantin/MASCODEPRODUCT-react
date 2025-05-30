<?php

use App\Models\Astuce;
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
            
        Schema::create('view_astuces', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Astuce::class)->constrained()->cascadeOnDelete();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->foreignIdFor(User::class)->nullable()->constrained();
            $table->timestamps();
            
            $table->index(['astuce_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('view_astuces');
    }
};
