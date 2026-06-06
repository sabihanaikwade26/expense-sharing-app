<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Expense;

class ExpenseController extends Controller {

    // GET expenses by trip
    public function index($trip_id) {
        return Expense::where('trip_id', $trip_id)->latest()->get();
    }

    // STORE expense
    public function store(Request $request) {

        $request->validate([
            'trip_id' => 'required',
            'title' => 'required',
            'amount' => 'required|numeric',
            'paid_by' => 'required',
            'split_between' => 'nullable|array'
        ]);

        $expense = Expense::create([
            'trip_id' => $request->trip_id,
            'title' => $request->title,
            'amount' => $request->amount,
            'paid_by' => $request->paid_by,
            'split_between' => json_encode($request->split_between)
        ]);

        return response()->json($expense);
    }
}