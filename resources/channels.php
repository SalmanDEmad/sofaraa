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

// Only the student or an admin can listen to a student's messages
Broadcast::channel('student-messages.{studentId}', function ($user, $studentId) {
    return (int) $user->id === (int) $studentId || ($user->is_admin ?? false);
});