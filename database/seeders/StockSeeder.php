<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stock;

class StockSeeder extends Seeder
{
    public function run(): void
    {
        // Tambahkan beberapa contoh data stok
        $stocks = [
            [
                'sku' => 'BRG-001',
                'name' => 'Monitor 24 Inch',
                'description' => 'Monitor LED full HD 24 inch',
                'quantity' => 10,
                'min_quantity' => 2,
            ],
            [
                'sku' => 'BRG-002',
                'name' => 'Keyboard Mechanical',
                'description' => 'Keyboard gaming RGB switch brown',
                'quantity' => 25,
                'min_quantity' => 5,
            ],
            [
                'sku' => 'BRG-003',
                'name' => 'Mouse Wireless',
                'description' => 'Mouse wireless 2.4GHz dengan receiver USB',
                'quantity' => 30,
                'min_quantity' => 5,
            ],
            [
                'sku' => 'BRG-004',
                'name' => 'Headset Bluetooth',
                'description' => 'Headset Bluetooth dengan noise cancelling',
                'quantity' => 15,
                'min_quantity' => 3,
            ],
        ];

        foreach ($stocks as $item) {
            Stock::create($item);
        }
    }
}
