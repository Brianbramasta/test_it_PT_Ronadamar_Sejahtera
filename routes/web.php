<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rute untuk laporan stok (user non-admin)
Route::get('/stock-report', [\App\Http\Controllers\StockReportController::class, 'index'])
    ->middleware(['auth'])
    ->name('stock.report');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'is_admin'])->group(function () {
    Route::get('/admin/stocks', [AdminController::class, 'index'])->name('admin.stocks');
    Route::get('/admin/stocks/create', [AdminController::class, 'create'])->name('admin.stocks.create');
    Route::post('/admin/stocks', [AdminController::class, 'store'])->name('admin.stocks.store');
    Route::get('/admin/stocks/{stock}/edit', [AdminController::class, 'edit'])->name('admin.stocks.edit');
    Route::put('/admin/stocks/{stock}', [AdminController::class, 'update'])->name('admin.stocks.update');
    Route::delete('/admin/stocks/{stock}', [AdminController::class, 'destroy'])->name('admin.stocks.destroy');
    Route::post('/admin/stocks/{stock}/adjust', [AdminController::class, 'adjust'])->name('admin.stocks.adjust');
});

// Route::middleware(['auth', 'is_admin'])->prefix('admin')->group(function(){
//     Route::get('/stocks', [AdminController::class, 'index']); // render React page via Inertia
// });

// Route::get('/admin/stocks', function(){
//     return Inertia::render('Admin/Stocks/Index');
// })->middleware(['auth','is_admin']);


require __DIR__.'/auth.php';
