<?php

namespace App\Http\Controllers;

use App\Http\Requests\MailingListRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Newsletter\Facades\Newsletter;


class MailingListController extends Controller
{
    public function index()
    {
        return Inertia::render("MailingList");

    }

    /**
     * Display a listing of the resource.
     */
    public function store(MailingListRequest $request)
    {
        $data = $request->validated();

        $studentTag = $data["userType"] == "student" ? true : false;

        $res = Newsletter::subscribeOrUpdate(
            $data["email"], [
                "FNAME" => $data["fname"],
                "LNAME" => $data["lname"],
            ],
            "subscribers", // this is a list in config/newsletter.php
            // grab the id from the dd below in testing
            [ 'interests' => [ '24e4977b15' => $studentTag, '34d8089146' => !$studentTag ] ],

        );

        session()->flash('success', "You've signed up for the mailing list!");

        return Inertia::render("MailingList");

    }

}
