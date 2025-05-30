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
        Schema::table('posts', function (Blueprint $t) {
            $t->string('image')->nullable();
        });
       /* Schema::table('posts', function (Blueprint $t) {
            $t->dropColumn('photo');
        });*/
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
