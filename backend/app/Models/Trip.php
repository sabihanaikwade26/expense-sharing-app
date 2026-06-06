<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Member;

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

    // public function members() {
    //     return $this->hasMany( Member::class );
    // }
}