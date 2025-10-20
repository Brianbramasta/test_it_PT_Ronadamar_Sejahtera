<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Stock;

class AdminController extends Controller
{
    /**
     * Halaman dashboard admin utama (daftar stok).
     */
    public function index()
    {
        // Ambil semua data stok
        $stocks = Stock::orderBy('created_at', 'desc')->get();

        // Kirim ke halaman React (resources/js/Pages/Admin/Stocks/Index.jsx)
        return Inertia::render('Admin/Stocks/Index', [
            'stocks' => $stocks,
            'flash' => [
                'message' => session('message')
            ]
        ]);
    }
    
    /**
     * Menampilkan form untuk membuat stok baru
     */
    public function create()
    {
        return Inertia::render('Admin/Stocks/Create');
    }
    
    /**
     * Menyimpan stok baru ke database
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sku' => 'nullable|string|unique:stocks,sku',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'nullable|integer|min:0',
            'min_quantity' => 'nullable|integer|min:0'
        ]);
        
        Stock::create($validated);
        
        return redirect()->route('admin.stocks')->with('message', 'Stok berhasil ditambahkan');
    }
    
    /**
     * Menampilkan form untuk mengedit stok
     */
    public function edit(Stock $stock)
    {
        return Inertia::render('Admin/Stocks/Edit', [
            'stock' => $stock
        ]);
    }
    
    /**
     * Mengupdate data stok
     */
    public function update(Request $request, Stock $stock)
    {
        $validated = $request->validate([
            'sku' => "nullable|string|unique:stocks,sku,{$stock->id}",
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'min_quantity' => 'nullable|integer|min:0'
        ]);
        
        $stock->update($validated);
        
        return redirect()->route('admin.stocks')->with('message', 'Stok berhasil diperbarui');
    }
    
    /**
     * Menghapus stok
     */
    public function destroy(Stock $stock)
    {
        $stock->delete();
        
        return redirect()->route('admin.stocks')->with('message', 'Stok berhasil dihapus');
    }
    
    /**
     * Menambah atau mengurangi jumlah stok
     */
    public function adjust(Request $request, Stock $stock)
    {
        $validated = $request->validate([
            'change' => 'required|integer',
            'note' => 'nullable|string'
        ]);
        
        $newQuantity = $stock->quantity + $validated['change'];
        
        if ($newQuantity < 0) {
            return back()->withErrors(['quantity' => 'Jumlah stok tidak boleh kurang dari 0']);
        }
        
        $stock->quantity = $newQuantity;
        $stock->save();
        
        return redirect()->route('admin.stocks')->with('message', 'Jumlah stok berhasil diperbarui');
    }
}
