<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->string('student_id')->change();
            $table->string('admin_id')->change();
        });
    }

    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->integer('student_id')->change(); // or whatever the original type was
            $table->integer('admin_id')->change();   // adjust if needed
        });
    }
};