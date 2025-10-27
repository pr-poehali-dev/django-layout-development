import json
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Proxy для отправки целей Яндекс.Метрики с сервера
    Args: event - dict с httpMethod, body (goal_name, client_id)
    Returns: HTML с JavaScript для отправки цели через ym()
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    data = json.loads(body_str)
    
    goal = data.get('goal', 'trial')
    client_id = data.get('client_id', '')
    
    html = f'''<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript">
        (function(m,e,t,r,i,k,a){{
            m[i]=m[i]||function(){{(m[i].a=m[i].a||[]).push(arguments)}};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {{if (document.scripts[j].src === r) {{ return; }}}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        }})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

        ym(104854671, 'init', {{
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
        }});
        
        // Ждём инициализации счётчика и отправляем цель
        setTimeout(function() {{
            ym(104854671, 'reachGoal', '{goal}', {{
                order_price: 0,
                currency: 'RUB'
            }});
            console.log('Goal sent: {goal}');
        }}, 1000);
    </script>
</head>
<body>
    <p>Sending goal: {goal}</p>
</body>
</html>'''
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/html; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        'body': html,
        'isBase64Encoded': False
    }
