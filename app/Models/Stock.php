<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
     // Kolom yang boleh diisi massal (mass assignment)
    protected $fillable = [
        'sku',
        'name',
        'description',
        'quantity',
        'min_quantity',
    ];
}
