<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Create a new table with the correct structure
        Schema::create('messages_new', function (Blueprint $table) {
            $table->id();
            $table->string('student_id');
            $table->string('admin_id');
            // Add all other columns from your original messages table
            $table->text('content')->nullable(); // example - adjust based on your actual schema
            $table->timestamps(); // example - adjust based on your actual schema
        });

        // Copy data from old table to new table
        DB::statement('INSERT INTO messages_new (id, student_id, admin_id, content, created_at, updated_at) 
                      SELECT id, CAST(student_id AS TEXT), CAST(admin_id AS TEXT), content, created_at, updated_at 
                      FROM messages');

        // Drop old table and rename new table
        Schema::drop('messages');
        Schema::rename('messages_new', 'messages');
    }

    public function down(): void
    {
        // Similar approach but converting back to integers
        Schema::create('messages_new', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id');
            $table->integer('admin_id');
            // Add all other columns
            $table->text('content')->nullable();
            $table->timestamps();
        });

        DB::statement('INSERT INTO messages_new (id, student_id, admin_id, content, created_at, updated_at) 
                      SELECT id, CAST(student_id AS INTEGER), CAST(admin_id AS INTEGER), content, created_at, updated_at 
                      FROM messages');

        Schema::drop('messages');
        Schema::rename('messages_new', 'messages');
    }
};