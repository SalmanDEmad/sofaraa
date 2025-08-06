<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::statement('ALTER TABLE messages ALTER COLUMN student_id TYPE VARCHAR USING student_id::VARCHAR');
        DB::statement('ALTER TABLE messages ALTER COLUMN admin_id TYPE VARCHAR USING admin_id::VARCHAR');
    }

    public function down(): void
    {
        // Optional: You can leave this empty if you're never reverting.
    }
};