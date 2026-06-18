<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller {

    // GET all trips

    public function index() {
        return Trip::with( [ 'creator', 'members' ] )->latest()->get();
    }

    // CREATE trip

    public function store( Request $request ) {
        $request->validate( [
            'name' => 'required',
            'total_amount' => 'nullable|numeric',
            'trip_date' => 'nullable|date',
            'members' => 'nullable|array'
        ] );

        // 1. create trip
        $trip = Trip::create( [
            'name' => $request->name,
            'created_by' => auth()->id(),
            'total_amount' => $request->total_amount ?? 0,
            'trip_date' => $request->trip_date,
        ] );

        // 2. attach members ( THIS IS WHERE IT GOES )
        if ( $request->members && count( $request->members ) > 0 ) {
            $trip->members()->attach( $request->members );
        }

        return response()->json( $trip );
    }

    public function show( $id ) {
        $trip = Trip::with( [ 'creator' ] )->find( $id );

        if ( !$trip ) {
            return response()->json( [ 'message' => 'Trip not found' ], 404 );
        }

        return response()->json( $trips );
    }

    // UPDATE trip

    public function update( Request $request, $id ) {

        $trip = Trip::find( $id );

        if ( !$trip ) {
            return response()->json( [ 'message' => 'Trip not found' ], 404 );
        }

        $trip->update( [
            'name' => $request->name,
            'total_amount' => $request->total_amount,
            'trip_date' => $request->trip_date,
        ] );

        if ( $request->members && is_array( $request->members ) ) {
            $trip->members()->sync( $request->members );
        }

        return response()->json( [
            'message' => 'Trip updated successfully',
            'trip' => $trip
        ] );
    }

    // DELETE trip

    public function destroy( $id ) {

        $trip = Trip::find( $id );

        if ( !$trip ) {
            return response()->json( [ 'message' => 'Trip not found' ], 404 );
        }

        $trip->delete();

        return response()->json( [
            'message' => 'Trip deleted successfully'
        ] );
    }

    public function myTrips() {
        $user = auth()->user();

        return $user->trips()
        ->with( [ 'creator', 'members' ] )
        ->latest()
        ->get();
    }

    public function addMembers( Request $request, $id ) {
        $trip = Trip::findOrFail( $id );

        $request->validate( [
            'user_ids' => 'required|array'
        ] );

        $trip->members()->syncWithoutDetaching( $request->user_ids );

        return response()->json( [
            'message' => 'Members added successfully'
        ] );
    }
}