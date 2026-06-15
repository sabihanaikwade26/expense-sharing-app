<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Trip extends Model {
    protected $fillable = [
        'name',
        'created_by',
        'total_amount',
        'trip_date',
        'members'
    ];

    protected $casts = [
        'members' => 'array',
    ];

    public function creator() {
        return $this->belongsTo( User::class, 'created_by' );
    }

    public function members() {
        return $this->belongsToMany( User::class, 'trip_user' );
    }
}