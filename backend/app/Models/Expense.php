<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model {
    
    protected $fillable = [
        'trip_id',
        'title',
        'amount',
        'paid_by',
        'split_between'
    ];

    protected $casts = [
        'split_between' => 'array',
    ];
}
