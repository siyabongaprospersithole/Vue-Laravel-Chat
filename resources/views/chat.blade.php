<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css')}}" />     
    <title>Document</title>
    <style>
     .list-group{
         overflow-y: scroll;
         height:200px;
     }
    </style>
</head>
<body>
    
    <div class="container">
      <div class="row" id="app">
      <div class="col-lg-4 offset-lg-4 offset-sm-1 col-sm-10">
      <li class="list-group-item active">Chat Room <small style="float: right;">@{{numberOfusers}}</small></li>
      <div class="badge badge-pill badge-primary"> @{{typing}} </div>
      <ul class="list-group" v-chat-scroll>
        
        <message-component v-for="value,index in chat.message"  :key=value.index :time=chat.time[index]  :color=chat.color[index]  :user = chat.user[index]> @{{value}}</message-component>
        <input type="text" v-on:keyup.enter="send" v-model="message" class="form-control" placeholder="Type your message here" />
     </ul>

   
      </div>
        </div>
    </div>

    <script type="text/javascript" src="{{ asset('js/app.js')}}"></script>
    <script type="text/javascript">
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    </script>
</body>
</html>