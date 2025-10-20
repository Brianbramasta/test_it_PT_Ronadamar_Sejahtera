<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat user admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'is_admin' => true,
            'password' => Hash::make('password'),
        ]);

        // Buat user biasa
        User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'is_admin' => false,
            'password' => Hash::make('password'),
        ]);
    }
}