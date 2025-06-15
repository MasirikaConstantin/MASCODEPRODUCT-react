<!DOCTYPE html>
<html>
<head>
    <title>Chat avec DeepSeek</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/app.js'])
</head>
<body>
    <div id="chatBox" style="height: 400px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px;"></div>
    <input type="text" id="userInput" placeholder="Posez votre question..." style="width: 80%; padding: 8px;">
    <button onclick="sendMessage()" style="padding: 8px;">Envoyer</button>

    <script src="{{ asset('js/chat.js') }}"></script>
</body>
</html>