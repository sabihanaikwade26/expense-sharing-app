<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Trip;
use App\Models\Expense;

class AdminDashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'users' => [
                'total' => User::count(),
                'admins' => User::where('role', 'admin')->count(),
                'users' => User::where('role', 'user')->count(),
                'members' => User::where('role', 'member')->count(),
            ],

            'trips' => [
                'total' => Trip::count(),
                'active' => Trip::where('status', 'active')->count(),
                'closed' => Trip::where('status', 'closed')->count(),
            ],

            'expenses' => [
                'total' => Expense::count(),
                'total_amount' => Expense::sum('amount'),
            ],
        ]);
    }
}