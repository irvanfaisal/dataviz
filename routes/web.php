<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('createSession', [PageController::class, 'createSession']);
Route::get('/', [PageController::class, 'index']);
Route::get('covid19', [PageController::class, 'covid19']);
Route::get('weather', [PageController::class, 'weather']);