<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->integer('semester')->nullable()->after('description');  // add semester column
            $table->dropColumn('price'); // remove price column
        });
    }

    public function down()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('semester');
            $table->decimal('price', 8, 2)->nullable(); // add price column back (adjust type if needed)
        });
    }
};
