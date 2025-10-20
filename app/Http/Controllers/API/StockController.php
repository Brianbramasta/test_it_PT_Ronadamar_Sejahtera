<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    public function index() {
        return response()->json(Stock::orderBy('created_at','desc')->get());
    }

    public function store(Request $request) {
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

    public function show(Stock $stock) {
        return response()->json($stock);
    }

    public function update(Request $request, Stock $stock) {
        $data = $request->validate([
            'sku' => "nullable|string|unique:stocks,sku,{$stock->id}",
            'name' => 'required|string',
            'description' => 'nullable|string',
            'min_quantity' => 'nullable|integer|min:0'
        ]);
        $stock->update($data);
        return response()->json($stock);
    }

    public function destroy(Stock $stock) {
        $stock->delete();
        return response()->json(null,204);
    }

    // adjust: tambah/kurangi stok
    public function adjust(Request $request, Stock $stock) {
        $data = $request->validate([
            'change' => 'required|integer', // positif = tambah, negatif = kurangi
            'note' => 'nullable|string'
        ]);

        // Pastikan konsistensi dengan transaksi & row lock
        DB::transaction(function() use($stock, $data) {
            $s = Stock::where('id', $stock->id)->lockForUpdate()->first();
            $newQty = $s->quantity + $data['change'];
            if ($newQty < 0) {
                abort(422, 'Quantity cannot be negative');
            }
            $s->quantity = $newQty;
            $s->save();

            // (Opsional) log transaksi, mis. StockLog model
        });

        return response()->json($stock->fresh());
    }
}
