<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Step 1: Drop existing foreign keys and columns if they exist
        Schema::table('videos', function (Blueprint $table) {
            try {
                $table->dropForeign(['tutor_id']);
                $table->dropForeign(['subject_id']);
                $table->dropForeign(['language_id']);
                $table->dropForeign(['course_id']); // ✅ Prevents duplicate foreign key
            } catch (\Exception $e) {
                // Ignore if already dropped or not supported (e.g. SQLite)
            }

            // Drop columns only if they exist
            foreach (['tutor_id', 'subject_id', 'language_id', 'thumbnail', 'url', 'status', 'visibility'] as $col) {
                if (Schema::hasColumn('videos', $col)) {
                    $table->dropColumn($col);
                }
            }
        });

        // Step 2: Add new columns and foreign key
        Schema::table('videos', function (Blueprint $table) {
            if (!Schema::hasColumn('videos', 'course_id')) {
                $table->unsignedBigInteger('course_id')->after('id');
            }

            if (!Schema::hasColumn('videos', 'youtube_link')) {
                $table->string('youtube_link')->after('description');
            }

            // ✅ Re-add the foreign key safely
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            // Rollback changes
            $table->dropForeign(['course_id']);
            $table->dropColumn(['course_id', 'youtube_link']);

            // Restore removed columns (optional if you need rollback)
            $table->unsignedBigInteger('tutor_id')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->unsignedBigInteger('language_id')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('url')->nullable();
            $table->string('status')->nullable();
            $table->string('visibility')->nullable();

            // Optionally restore foreign keys
            // $table->foreign('tutor_id')->references('id')->on('users')->onDelete('set null');
            // $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('set null');
            // $table->foreign('language_id')->references('id')->on('languages')->onDelete('set null');
        });
    }
};