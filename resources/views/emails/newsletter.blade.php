<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $content['subject'] }}</title>
    <style>
        /* Styles de base */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f6f9fc;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        
        .email-wrapper {
            width: 100%;
            padding: 20px;
        }
        
        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        /* En-tête */
        .email-header {
            background-color: #1e40af;
            padding: 30px 20px;
            text-align: center;
        }
        
        .email-header img {
            height: 50px;
        }
        
        /* Corps */
        .email-body {
            padding: 30px;
        }
        
        .email-title {
            font-size: 24px;
            margin-bottom: 25px;
            color: #1e40af;
            text-align: center;
        }
        
        /* Sections */
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 18px;
            color: #1e40af;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        
        .item-list {
            margin-left: 20px;
        }
        
        .item {
            margin-bottom: 12px;
            position: relative;
            padding-left: 15px;
        }
        
        .item:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #3b82f6;
        }
        
        .item-link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: bold;
        }
        
        .item-desc {
            color: #64748b;
            font-size: 14px;
            display: block;
            margin-top: 2px;
        }
        
        /* Bouton CTA */
        .cta-wrapper {
            text-align: center;
            margin: 30px 0;
        }
        
        .email-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3b82f6;
            color: #fff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
        }
        
        /* Pied de page */
        .email-footer {
            padding: 20px;
            font-size: 12px;
            text-align: center;
            color: #666;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-note {
            font-style: italic;
            margin-bottom: 15px;
            color: #475569;
        }
        
        .unsubscribe-link {
            color: #64748b;
            text-decoration: underline;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .email-body {
                padding: 20px;
            }
            
            .email-title {
                font-size: 20px;
            }
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
                
                <p><strong>Bonjour {{ $subscriber->nom ?? 'cher abonné' }},</strong></p>
                <p>Voici votre sélection exclusive du mois :</p>
                
                @foreach($content['sections'] as $section)
                    <div class="section">
                        <h2 class="section-title">{{ $section['title'] }}</h2>
                        
                        @if(isset($section['items']))
                            <ul class="item-list">
                                @foreach($section['items'] as $item)
                                    <li class="item">
                                        @if(is_array($item))
                                            <a href="{{ $item['url'] }}" class="item-link">{{ $item['text'] }}</a>
                                            <span class="item-desc">{{ $item['desc'] }}</span>
                                        @else
                                            {{ $item }}
                                        @endif
                                    </li>
                                @endforeach
                            </ul>
                        @elseif(isset($section['content']))
                            <p>{!! nl2br(e($section['content'])) !!}</p>
                        @endif
                    </div>
                @endforeach
                
                <div class="footer-note">
                    {{ $content['footer_note'] }}
                </div>
                
                <div class="cta-wrapper">
                    <a href="{{ $content['cta_url'] }}" class="email-button">
                        {{ $content['cta_text'] }}
                    </a>
                </div>
            </div>
            
            <div class="email-footer">
                &copy; {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés.<br>
                <a href="{{ $unsubscribeLink }}" class="unsubscribe-link">Se désabonner</a>
            </div>
        </div>
    </div>
</body>
</html>