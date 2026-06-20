<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TripController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\AdminDashboardController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (NO AUTH)
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (AUTH REQUIRED)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->group(function () {

    // TRIPS
    Route::get('/trips', [TripController::class, 'index']);
    Route::post('/trips', [TripController::class, 'store']);
    Route::get('/trips/{id}', [TripController::class, 'show']);
    Route::put('/trips/{id}', [TripController::class, 'update']);
    Route::delete('/trips/{id}', [TripController::class, 'destroy']);

    Route::get('/my-trips', [TripController::class, 'myTrips']);
    Route::post('/trips/{id}/members', [TripController::class, 'addMembers']);
    Route::get('/users', [TripController::class, 'getUsers']);

    // EXPENSES
    Route::get('/expenses/{trip_id}', [ExpenseController::class, 'index']);
    Route::post('/expenses', [ExpenseController::class, 'store']);

    // ADMIN
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::get('/admin/stats', [AdminDashboardController::class, 'stats']);
    Route::middleware('auth:sanctum')->get('/member/trips', [TripController::class, 'myTrips']);
});