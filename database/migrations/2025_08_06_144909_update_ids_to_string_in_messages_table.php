<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            // Step 1: Make them nullable first to avoid SQLite constraint error
            $table->unsignedBigInteger('student_id')->nullable()->change();
            $table->unsignedBigInteger('admin_id')->nullable()->change();
        });

        Schema::table('messages', function (Blueprint $table) {
            // Step 2: Change type to string
            $table->string('student_id')->nullable()->change();
            $table->string('admin_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            // Revert back to original bigint + nullable
            $table->unsignedBigInteger('student_id')->nullable()->change();
            $table->unsignedBigInteger('admin_id')->nullable()->change();
        });
    }
};