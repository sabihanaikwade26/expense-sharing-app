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
        Schema::create('trips', function (Blueprint $table) {
        $table->id();
        $table->string('name');

        $table->foreignId('created_by')
            ->constrained('users')
            ->onDelete('cascade');

        // ✅ ADD THESE MISSING COLUMNS
        $table->decimal('total_amount', 10, 2)->default(0);
        $table->date('trip_date')->nullable();
        $table->json('members')->nullable();

        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
