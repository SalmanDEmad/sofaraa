<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Subject;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        //
        Language::factory()->createMany([
             ['name' => 'English'],
             ['name' => 'Arabic']
        ]);

        Subject::factory()->createMany([
            ['name' => 'Mathematics'],
            ['name' => 'Science'],
            ['name' => 'History'],
            ['name' => 'Literature'],
            ['name' => 'Geography'],
            ['name' => 'Physics'],
            ['name' => 'Chemistry'],
            ['name' => 'Biology'],
            ['name' => 'Computer Science'],
            ['name' => 'Economics'],
            ['name' => 'Art'],
            ['name' => 'Music'],
            ['name' => 'Philosophy'],
            ['name' => 'Political Science'],
            ['name' => 'Sociology'],
            ['name' => 'Psychology'],
            ['name' => 'Engineering'],
            ['name' => 'Statistics'],
            ['name' => 'Business Studies'],
            ['name' => 'Law'],
            ['name' => 'Medicine'],
        ]);

        User::factory()->create([
            'role_id' => User::ADMIN,
            'name' => 'admin',
            'email' => env("ADMIN_EMAIL"),
            'email_verified_at' => now(),
            'password' => Hash::make(env("ADMIN_PASSWORD"))
        ]);

        if (config("app.env") == "local") {

            User::factory()->create([
                'role_id' => User::TUTOR,
                'name' => 'Professor hoodedice',
                'email' => env("TEST_TUTOR_EMAIL"),
                'email_verified_at' => now(),
                'gender' => User::MALE,
                'password' => Hash::make(env("TEST_TUTOR_PASSWORD")),
                'primary_subject_id' => 1, // Subject::where("name", "Mathematics")->first()->id,
                'primary_language_id' => 1 // Subject::where("name", "English")->first()->id,

            ]);

            User::factory()->create([
                'role_id' => User::STUDENT,
                'name' => 'Jimmy',
                'email' => "jimmy@example.com",
                'email_verified_at' => now(),
                'gender' => User::MALE,
                'password' => "student1"
            ]);

            User::factory()->create([
                'role_id' => User::STUDENT,
                'name' => 'Jenny',
                'email' => "jenny@example.com",
                'email_verified_at' => now(),
                'gender' => User::FEMALE,
                'password' => "student1"
            ]);
        }

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


    }
}
