import json
import os
from typing import Dict, Any

BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '8238321643:AAEV7kBinohHb-RSLah7VSBJ2XSsXTQUpW4')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram бот для обработки сообщений от пользователей
    Args: event - dict с httpMethod, body; context - объект с request_id
    Returns: HTTP response dict
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
    
    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'text/plain'},
            'body': 'Telegram Bot Webhook OK',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_str = event.get('body', '{}')
        print(f"Received update: {body_str}")
        update = json.loads(body_str)
        
        if 'message' not in update:
            print("No message in update")
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True}),
                'isBase64Encoded': False
            }
        
        message = update['message']
        chat_id = message['chat']['id']
        text = message.get('text', '')
        print(f"Chat ID: {chat_id}, Text: {text}")
        
        if text == '/start':
            response_text = (
                '👋 Привет! Я бот театральной студии Ольги Штерц.\n\n'
                '📚 У нас есть два курса:\n'
                '🎭 Актерское мастерство\n'
                '🎤 Ораторское искусство\n\n'
                'Напишите /courses для подробной информации о курсах\n'
                'Напишите /contact для связи с нами'
            )
        elif text == '/courses':
            response_text = (
                '🎓 Наши курсы:\n\n'
                '🎭 <b>Актерское мастерство</b>\n'
                'Развитие актерских навыков, эмоциональный интеллект, работа с текстом\n'
                '⏱ Длительность: 10 недель\n\n'
                '🎤 <b>Ораторское искусство</b>\n'
                'Уверенные выступления, постановка голоса, работа с аудиторией\n'
                '⏱ Длительность: 8 недель\n\n'
                'Для записи напишите /contact'
            )
        elif text == '/contact':
            response_text = (
                '📞 Связаться с нами:\n\n'
                '📧 Email: info@olga-sterts.ru\n'
                '🌐 Сайт: https://olga-sterts.ru\n\n'
                'Или оставьте ваше сообщение здесь, и мы вам ответим!'
            )
        elif text.startswith('/'):
            response_text = (
                '❓ Неизвестная команда.\n\n'
                'Доступные команды:\n'
                '/start - Начать\n'
                '/courses - Курсы\n'
                '/contact - Контакты'
            )
        else:
            response_text = (
                'Спасибо за ваше сообщение! 🙏\n\n'
                'Мы получили ваш запрос и скоро с вами свяжемся.\n\n'
                'Используйте /courses чтобы узнать больше о наших программах.'
            )
        
        print(f"Sending message to {chat_id}")
        result = send_message(chat_id, response_text)
        print(f"Message sent: {result}")
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True, 'error': str(e)}),
            'isBase64Encoded': False
        }

def send_message(chat_id: int, text: str):
    '''Отправка сообщения пользователю через Telegram Bot API'''
    import urllib.request
    
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    
    data = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode('utf-8')
    
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode('utf-8'))