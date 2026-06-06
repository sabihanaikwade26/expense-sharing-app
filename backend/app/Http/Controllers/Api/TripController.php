<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller {

    // GET all trips
    public function index() {
        return Trip::latest()->get(); // ❌ remove withCount
    }

    // CREATE trip
    public function store(Request $request) {

        $request->validate([
            'name' => 'required',
            'total_amount' => 'nullable|numeric',
            'trip_date' => 'nullable|date',
            'members' => 'nullable|array'
        ]);

        $trip = Trip::create([
            'name' => $request->name,
            'created_by' => 1,
            'total_amount' => $request->total_amount ?? 0,
            'trip_date' => $request->trip_date,
            'members' => is_array($request->members) ? $request->members : [] // ✅ FIX
        ]);

        return response()->json($trip);
    }

    // UPDATE trip
    public function update(Request $request, $id) {

        $trip = Trip::find($id);

        if (!$trip) {
            return response()->json(['message' => 'Trip not found'], 404);
        }

        $trip->update([
            'name' => $request->name,
            'total_amount' => $request->total_amount,
            'trip_date' => $request->trip_date,
            'members' => is_array($request->members) ? $request->members : [] // ✅ FIX
        ]);

        return response()->json([
            'message' => 'Trip updated successfully',
            'trip' => $trip
        ]);
    }

    // DELETE trip
    public function destroy($id) {

        $trip = Trip::find($id);

        if (!$trip) {
            return response()->json(['message' => 'Trip not found'], 404);
        }

        $trip->delete();

        return response()->json([
            'message' => 'Trip deleted successfully'
        ]);
    }
}