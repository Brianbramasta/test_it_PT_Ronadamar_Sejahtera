<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\StockController;
use App\Http\Controllers\API\PublicStockController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// API yang memerlukan autentikasi
Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('stocks', StockController::class);
    Route::post('stocks/{stock}/adjust', [StockController::class, 'adjust']);
});

// API publik yang dapat diakses tanpa autentikasi (untuk Postman)
Route::prefix('public')->group(function() {
    Route::apiResource('stocks', PublicStockController::class);
    Route::post('stocks/{stock}/adjust', [PublicStockController::class, 'adjust']);
});

