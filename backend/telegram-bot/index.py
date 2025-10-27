import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

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
        
        if 'callback_query' in update:
            return handle_callback(update['callback_query'])
        
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
        
        if text == '/chatid':
            response_text = f'🆔 Ваш Chat ID: <code>{chat_id}</code>\n\nСкопируйте это число и вставьте в поле TELEGRAM_ADMIN_CHAT_ID'
        elif text == '/start':
            response_text = (
                '👋 Привет! Я бот театральной студии Ольги Штерц.\n\n'
                '📚 У нас есть два курса:\n'
                '🎭 Актерское мастерство\n'
                '🎤 Ораторское искусство\n\n'
                'Напишите /courses для подробной информации о курсах\n'
                'Напишите /contact для связи с нами\n'
                'Напишите /chatid чтобы узнать ID чата'
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

def handle_callback(callback_query: dict):
    '''Обработка нажатий на inline кнопки'''
    import urllib.request
    
    callback_id = callback_query['id']
    chat_id = callback_query['message']['chat']['id']
    message_id = callback_query['message']['message_id']
    data = callback_query['data']
    
    if data.startswith('status_'):
        parts = data.split('_')
        lead_id = int(parts[1])
        status = parts[2]
        
        status_names = {
            'trial': 'Записался на пробное',
            'enrolled': 'Записался на обучение',
            'thinking': 'Думает',
            'irrelevant': 'Нецелевой'
        }
        
        status_emojis = {
            'trial': '✅',
            'enrolled': '🎓',
            'thinking': '🤔',
            'irrelevant': '❌'
        }
        
        try:
            conn = psycopg2.connect(os.environ['DATABASE_URL'])
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute(
                "UPDATE leads SET status = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING *",
                (status, lead_id)
            )
            lead = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            ym_client_id = lead.get('ym_client_id') if lead else None
            
            if lead:
                from datetime import datetime
                created_at = lead['created_at']
                
                months_ru = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                             'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
                
                formatted_date = f"{created_at.day} {months_ru[created_at.month - 1]} {created_at.year} года в {created_at.strftime('%H:%M')}"
                
                course_emoji = '🎭' if lead.get('course') == 'acting' else '🎤' if lead.get('course') == 'oratory' else '❓'
                course_name = 'Актёрское мастерство' if lead.get('course') == 'acting' else 'Ораторское искусство' if lead.get('course') == 'oratory' else 'Не указан'
                
                new_message = (
                    f"───────────────────\n"
                    f"{status_emojis[status]} <b>{status_names[status].upper()}</b>\n"
                    f"───────────────────\n\n"
                    f"📞 <b>Телефон:</b> <code>{lead['phone']}</code>\n"
                    f"{course_emoji} <b>Курс:</b> {course_name}\n"
                    f"📅 <b>Дата:</b> {formatted_date}\n\n"
                    f"───────────────────"
                )
                
                url = f'https://api.telegram.org/bot{BOT_TOKEN}/editMessageText'
                data_update = json.dumps({
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': new_message,
                    'parse_mode': 'HTML'
                }).encode('utf-8')
                
                req = urllib.request.Request(
                    url,
                    data=data_update,
                    headers={'Content-Type': 'application/json'}
                )
                
                with urllib.request.urlopen(req) as response:
                    pass
                
                metrika_goals = {
                    'trial': 'trial',
                    'enrolled': 'course',
                    'thinking': 'wait',
                    'irrelevant': 'close'
                }
                
                if status in metrika_goals:
                    try:
                        send_metrika_goal(metrika_goals[status], ym_client_id)
                    except Exception as e:
                        print(f"Failed to send metrika goal: {e}")
        
        except Exception as e:
            print(f"Error updating status: {e}")
    
    answer_url = f'https://api.telegram.org/bot{BOT_TOKEN}/answerCallbackQuery'
    answer_data = json.dumps({
        'callback_query_id': callback_id,
        'text': '✅ Статус обновлен!'
    }).encode('utf-8')
    
    req = urllib.request.Request(
        answer_url,
        data=answer_data,
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req) as response:
        pass
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True}),
        'isBase64Encoded': False
    }

def send_metrika_goal(goal: str, client_id: str = None):
    '''Отправка цели в Яндекс.Метрику с Client ID'''
    import urllib.request
    
    metrika_url = 'https://functions.poehali.dev/30856b9e-1809-4ef3-9ef0-a8f4a03ddf11'
    
    payload = {'goal': goal}
    if client_id:
        payload['client_id'] = client_id
    
    data = json.dumps(payload).encode('utf-8')
    
    req = urllib.request.Request(
        metrika_url,
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode('utf-8'))