<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Stock;

class StockReportController extends Controller
{
    /**
     * Menampilkan laporan stok untuk user non-admin
     */
    public function index()
    {
        // Ambil semua data stok
        $stocks = Stock::orderBy('name')->get();
        
        // Hitung statistik stok
        $totalItems = $stocks->count();
        $lowStockItems = $stocks->filter(function($stock) {
            return $stock->quantity <= $stock->min_quantity;
        })->count();
        $totalQuantity = $stocks->sum('quantity');
        
        // Kirim ke halaman React
        return Inertia::render('StockReport/Index', [
            'stocks' => $stocks,
            'stats' => [
                'totalItems' => $totalItems,
                'lowStockItems' => $lowStockItems,
                'totalQuantity' => $totalQuantity
            ]
        ]);
    }
}