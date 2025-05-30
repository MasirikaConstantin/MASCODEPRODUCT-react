<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>{{ $content['subject'] }}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f6f9fc;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .email-wrapper {
            width: 100%;
            padding: 20px;
            background-color: #f6f9fc;
        }

        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .email-header {
            background-color: #1e40af;
            padding: 20px;
            text-align: center;
        }

        .email-header img {
            height: 50px;
        }

        .email-body {
            padding: 30px;
        }

        .email-title {
            font-size: 24px;
            margin-bottom: 20px;
            color: #1e40af;
        }

        .email-text {
            font-size: 16px;
            line-height: 1.6;
        }

        .email-button {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 24px;
            background-color: #3b82f6;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
        }

        .email-footer {
            padding: 20px;
            font-size: 12px;
            text-align: center;
            color: #666;
        }

        .email-footer a {
            color: #888;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <img src="{{ asset('images/logo-email.png') }}" alt="{{ config('app.name') }}">
            </div>
            <div class="email-body">
                <h1 class="email-title">{{ $content['title'] }}</h1>
                <div class="email-text">
                    {!! $content['body'] !!}
                </div>
                <a href="{{ $content['cta_url'] }}" class="email-button">
                    {{ $content['cta_text'] }}
                </a>
            </div>
            <div class="email-footer">
                &copy; {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés. <br>
                <a href="{{ $unsubscribeLink }}">Se désabonner</a>
            </div>
        </div>
    </div>
</body>
</html>
