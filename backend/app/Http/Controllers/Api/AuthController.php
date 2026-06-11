<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    public function login( Request $request ) {
        $request->validate( [
            'email' => 'required|email',
            'password' => 'required'
        ] );

        if ( !Auth::attempt( $request->only( 'email', 'password' ) ) ) {
            return response()->json( [
                'message' => 'Invalid credentials'
            ], 401 );
        }

        $user = Auth::user();

        $token = $user->createToken( 'auth_token' )->plainTextToken;

        return response()->json( [
            'token' => $token,
            'user' => $user
        ] );
    }

    public function register( Request $request ) {
        $request->validate( [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed'
        ] );

        $user = User::create( [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make( $request->password ),
            // 'role' => 'user'
        ] );

        return response()->json( [
            'message' => 'Registration successful',
            'user' => $user
        ], 201 );
    }
}
