<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use Illuminate\Http\Request;

class PublicStockController extends Controller
{
    /**
     * Menampilkan daftar stok
     */
    public function index() 
    {
        return response()->json(Stock::orderBy('created_at','desc')->get());
    }

    /**
     * Menampilkan detail stok
     */
    public function show(Stock $stock) 
    {
        return response()->json($stock);
    }

    /**
     * Membuat stok baru
     */
    public function store(Request $request) 
    {
        $data = $request->validate([
            'sku' => 'nullable|string|unique:stocks,sku',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'quantity' => 'nullable|integer|min:0',
            'min_quantity' => 'nullable|integer|min:0'
        ]);
        $stock = Stock::create($data);
        return response()->json($stock, 201);
    }

    /**
     * Mengupdate stok
     */
    public function update(Request $request, Stock $stock) 
    {
        $data = $request->validate([
            'sku' => "nullable|string|unique:stocks,sku,{$stock->id}",
            'name' => 'required|string',
            'description' => 'nullable|string',
            'min_quantity' => 'nullable|integer|min:0'
        ]);
        $stock->update($data);
        return response()->json($stock);
    }

    /**
     * Menghapus stok
     */
    public function destroy(Stock $stock) 
    {
        $stock->delete();
        return response()->json(null, 204);
    }

    /**
     * Menambah atau mengurangi jumlah stok
     */
    public function adjust(Request $request, Stock $stock) 
    {
        $data = $request->validate([
            'change' => 'required|integer', // positif = tambah, negatif = kurangi
            'note' => 'nullable|string'
        ]);

        $newQty = $stock->quantity + $data['change'];
        if ($newQty < 0) {
            return response()->json(['error' => 'Quantity cannot be negative'], 422);
        }
        
        $stock->quantity = $newQty;
        $stock->save();

        return response()->json($stock);
    }
}