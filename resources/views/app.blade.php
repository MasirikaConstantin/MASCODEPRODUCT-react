<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" 
      @if(auth()->check() && auth()->user()->settings) 
          data-theme="{{ auth()->user()->settings['theme'] ?? 'light' }}"
          class="font-{{ auth()->user()->settings['font'] ?? 'sans' }}"
      @else
          data-theme="light"
          class="font-comfortaa"
      @endif
>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <link rel="icon" href="{{ asset('mas-product.ico') }}" />

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Comfortaa&family=Ubuntu&family=Poppins&family=Roboto&family=Montserrat&family=Playfair+Display&family=Lato&family=Raleway&family=Nunito&family=Pacifico&family=Oswald&family=Quicksand&display=swap" rel="stylesheet">

        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <!-- Vos autres imports de polices... (gardez tous vos liens existants) -->

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

        <!-- Style initial pour éviter le flash de thème incorrect -->
        <script>
            document.documentElement.setAttribute('data-theme', 
                @if(auth()->check() && auth()->user()->settings)
                    '{{ auth()->user()->settings["theme"] ?? "dark" }}'
                @else
                    'dark'
                @endif
            );
            
            // Applique la police immédiatement
            document.documentElement.classList.add(
                @if(auth()->check() && auth()->user()->settings)
                    'font-{{ auth()->user()->settings["font"] ?? "comfortaa" }}'
                @else
                    'font-comfortaa'
                @endif
            );
        </script>
    </head>
    <body class="min-h-screen bg-base-100">
        @inertia
    </body>
</html>