<!DOCTYPE html>
<html>
<head>
    <style>
        .message-card {
            max-width: 800px;
            margin: 20px auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .message-header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 20px;
        }

        .message-title {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
        }

        .message-body {
            padding: 30px;
        }

        .sender-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 25px;
        }

        .info-group {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }

        .info-label {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .info-value {
            font-size: 16px;
            color: #1e293b;
        }

        .message-content {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            color: #1e293b;
            line-height: 1.6;
        }

        .actions {
            padding: 20px 30px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 15px;
            justify-content: flex-end;
        }

        .btn-primary {
            background: #3b82f6;
            color: white;
            padding: 12px 25px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: background 0.3s;
        }

        .btn-primary:hover {
            background: #2563eb;
        }

        @media (max-width: 640px) {
            .sender-info {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="message-card">
        <div class="message-header">
            <h1 class="message-title">Nouveau Contact</h1>
        </div>

        <div class="message-body">
            <div class="sender-info">
                <div class="info-group">
                    <div class="info-label">Nom du signaleur : </div>
                    <div class="info-value">{{$user['name']}}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Email du signaleur : </div>
                    <div class="info-value">{{$user['email']}}</div>
                </div>
            </div>

            <div class="sender-info">
                <div class="info-group">
                    <div class="info-label">Nom du proprietaire : </div>
                    <div class="info-value">{{$post->user->name}}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Email du proprietaire : </div>
                    <div class="info-value">{{$post->user->email}}</div>
                </div>
            </div>

            <div class="message-content">
                <a href="{{route('user.show',['nom'=>Str::lower($post->slug),'post'=>$post])}}">Vers le POST</a>
                <div class="info-label">Message</div>
                <div>{{$data['Raison']}}</div>
            </div>
        </div>

        <div class="actions">
            <a href="mailto:{{$user['email']}}" class="btn-primary">
                Répondre à ce message
            </a>
        </div>
    </div>
</body>
</html>