<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            // Drop foreign keys first (only if they exist in MySQL/Postgres, SQLite will ignore)
            try {
                $table->dropForeign(['tutor_id']);
                $table->dropForeign(['subject_id']);
                $table->dropForeign(['language_id']);
            } catch (\Exception $e) {
                // SQLite doesn't support dropping foreign keys this way – ignore
            }

            // Drop columns if they exist
            foreach (['tutor_id', 'subject_id', 'language_id', 'thumbnail', 'url', 'status', 'visibility'] as $col) {
                if (Schema::hasColumn('videos', $col)) {
                    $table->dropColumn($col);
                }
            }
        });

        Schema::table('videos', function (Blueprint $table) {
            if (!Schema::hasColumn('videos', 'course_id')) {
                $table->unsignedBigInteger('course_id')->after('id');
            }
            if (!Schema::hasColumn('videos', 'youtube_link')) {
                $table->string('youtube_link')->after('description');
            }

            // SQLite does not enforce foreign keys strictly, but Laravel allows this line
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->dropForeign(['course_id']);
            $table->dropColumn(['course_id', 'youtube_link']);

            $table->unsignedBigInteger('tutor_id')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->unsignedBigInteger('language_id')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('url')->nullable();
            $table->string('status')->nullable();
            $table->string('visibility')->nullable();

            // Optional: add foreign keys back if needed
            // $table->foreign('tutor_id')->references('id')->on('users')->onDelete('set null');
            // $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('set null');
            // $table->foreign('language_id')->references('id')->on('languages')->onDelete('set null');
        });
    }
};