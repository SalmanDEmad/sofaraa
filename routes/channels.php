<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Authorize user for default user channel (optional)
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Authorize chat channel where either the student or admin can listen
Broadcast::channel('chat.{studentId}', function ($user, $studentId) {
    return (int) $user->id === (int) $studentId || $user->role_id === 2; // 2 = admin role ID
});
