<?php

namespace App\Policies;

use App\Models\Livestream;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LivestreamPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // TODO
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Livestream $livestream): bool
    {
        //
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole(User::ADMIN) || $user->hasRole(User::TUTOR);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Livestream $livestream): bool
    {
        return $user->hasRole(User::ADMIN) || $user->hasRole(User::TUTOR) && $livestream->tutor_id == $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Livestream $livestream): bool
    {
        return $user->hasRole(User::ADMIN) ||$user->hasRole(User::TUTOR) && $livestream->tutor_id == $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Livestream $livestream): bool
    {
        return $user->hasRole(User::ADMIN) ||$user->hasRole(User::TUTOR) && $livestream->tutor_id == $user->id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Livestream $livestream): bool
    {
        return $user->hasRole(User::ADMIN) ||$user->hasRole(User::TUTOR) && $livestream->tutor_id == $user->id;
    }
}
