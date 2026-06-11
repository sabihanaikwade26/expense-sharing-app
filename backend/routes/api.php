<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TripController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\AuthController;

Route::get('/trips', [TripController::class, 'index']);
Route::post('/trips', [TripController::class, 'store']);

Route::get('/expenses/{trip_id}', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::delete('/trips/{id}', [TripController::class, 'destroy']);
Route::put('/trips/{id}', [TripController::class, 'update']);
Route::get('/trips/{id}', [TripController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);