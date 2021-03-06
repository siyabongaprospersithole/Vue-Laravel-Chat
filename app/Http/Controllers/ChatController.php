<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use Illuminate\Http\Request;

class ChatController extends Controller
{

    public function __construct(){
        $this->middleware('auth');
    }
    public function chat(){
        return view('chat');
    }

    public function send(Request $request){
       
        event(new ChatEvent($request->message,auth()->user()->name));
    }
}
