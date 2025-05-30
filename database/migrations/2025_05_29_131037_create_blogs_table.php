<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('image_url')->nullable();
            $table->string('author_id');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->integer('read_time')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->foreign("author_id")->references('id')->on("users");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};