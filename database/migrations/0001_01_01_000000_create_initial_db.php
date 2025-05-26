<?php

use App\Models\Video;
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
        Schema::create('users', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->smallInteger('role_id')->default(1); 
            $table->string('name');
            $table->smallInteger("gender")->nullable();
            $table->string("profile_image")->nullable();
            $table->smallInteger("primary_subject_id")->nullable();
            $table->smallInteger("primary_language_id")->nullable();
            $table->string("description")->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();

            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration');
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration');
        });

        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });

        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->integer('total_jobs');
            $table->integer('pending_jobs');
            $table->integer('failed_jobs');
            $table->longText('failed_job_ids');
            $table->mediumText('options')->nullable();
            $table->integer('cancelled_at')->nullable();
            $table->integer('created_at');
            $table->integer('finished_at')->nullable();
        });

        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
        });

        Schema::create('languages', function (Blueprint $table) {
            $table->smallIncrements("id");
            $table->string("name");
        });

        Schema::create('subjects', function (Blueprint $table) {
            $table->smallIncrements("id");
            $table->string("name");
            $table->string("description")->nullable();
            $table->string("image")->nullable();
            $table->boolean("is_active")->default(true);
            $table->string("requested_by_id")->nullable();
            $table->timestamps();

            $table->foreign("requested_by_id")->references('id')->on("users");
        });

        Schema::create('livestreams', function (Blueprint $table) {
            $table->string("id")->primary();
            $table->string("tutor_id");
            $table->smallInteger("subject_id")->nullable();

            $table->string("thumbnail")->nullable();
            $table->string("title");
            $table->text("description")->nullable();
            $table->integer("price")->nullable();
            $table->string("url")->nullable();
            $table->timestamp("stream_at");
            $table->smallInteger("status")->default(0);
            $table->smallInteger("visibility")->default(0);
            $table->timestamps();

            $table->foreign('subject_id')->references('id')->on('subjects');
            $table->foreign("tutor_id")->references('id')->on('users');
        });

        Schema::create("courses", function (Blueprint $table) {
            $table->string("id")->primary();
            $table->string("tutor_id");
            $table->smallInteger("subject_id")->nullable();

            $table->string("name");
            $table->text("description")->nullable();

            $table->integer("price")->nullable();
            $table->smallInteger("status")->default(0);

            $table->foreign('subject_id')->references('id')->on('subjects');
            $table->foreign("tutor_id")->references('id')->on('users');
        });

        Schema::create('videos', function (Blueprint $table) {
            $table->string("id")->primary();
            $table->string("tutor_id");
            $table->smallInteger("subject_id")->nullable();
            $table->string("course_id")->nullable();
            $table->smallInteger("language_id")->nullable();
            $table->string("thumbnail")->nullable();
            $table->string("title");
            $table->text("description")->nullable();
            $table->string("url")->nullable();
            $table->smallInteger("status")->default(Video::NO_VIDEO);
            $table->smallInteger("visibility")->default(Video::PUBLIC);

            $table->timestamps();

            $table->foreign("language_id")->references("id")->on("languages");
            $table->foreign("course_id")->references("id")->on("courses");
            $table->foreign('subject_id')->references('id')->on('subjects');
            $table->foreign("tutor_id")->references('id')->on('users');
        });

        Schema::create("reviews", function (Blueprint $table) {
            $table->string('id')->primary();

            $table->smallInteger("stars");
            $table->text("content");
            $table->smallInteger("language_id");
            $table->string("tutor_id");
            $table->string("reviewed_by_id");
            $table->timestamps();


        });

        // pivot-tables
        Schema::create('user_languages', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("user_id");
            $table->smallInteger("subject_id");

            $table->foreign("user_id")->references('id')->on("users");
            $table->foreign("subject_id")->references("id")->on("languages");
        });

        Schema::create('parents_children', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("parent_id");
            $table->string("child_id");
            $table->smallInteger("relation")->nullable();
            $table->smallInteger("status")->default(0);

            $table->foreign("parent_id")->references('id')->on("users");
            $table->foreign("child_id")->references("id")->on("users");
        });

        Schema::create('tutor_followers', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("tutor_id");
            $table->string("student_id");
            $table->smallInteger("status")->default(0);

            $table->foreign("tutor_id")->references('id')->on("users");
            $table->foreign("student_id")->references("id")->on("users");
        });

        Schema::create('friends', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("user_id");
            $table->string("friend_id");
            $table->smallInteger("status")->default(0);

            $table->foreign("user_id")->references('id')->on("users");
            $table->foreign("friend_id")->references("id")->on("users");
        });

        // FKs
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('primary_subject_id')->references('id')->on('subjects');
            $table->foreign("primary_language_id")->references('id')->on('languages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need since this is the first migration, the only way back is to drop everything
    }
};
