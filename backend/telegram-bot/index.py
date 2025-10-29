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

def send_metrika_goal(goal: str, client_id: str, lead_id: int = None, params: dict = None):
    '''Отправка цели в Яндекс.Метрику через централизованную функцию'''
    import urllib.request
    
    metrika_url = 'https://functions.poehali.dev/3d824f97-2f09-44e4-8c9a-54af8aa6ccce'
    
    payload = {
        'goal': goal,
        'client_id': client_id or f'telegram_{lead_id}',
        'lead_id': lead_id,
        'params': params or {}
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        metrika_url,
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req, timeout=5) as response:
        return json.loads(response.read().decode('utf-8'))

def handle_callback(callback_query: dict):
    '''Обработка нажатий на inline кнопки'''
    import urllib.request
    
    callback_id = callback_query['id']
    chat_id = callback_query['message']['chat']['id']
    message_id = callback_query['message']['message_id']
    data = callback_query['data']
    
    if data.startswith('called_'):
        lead_id = int(data.split('_')[1])
        return handle_called(callback_id, chat_id, message_id, lead_id)
    
    elif data.startswith('target_'):
        parts = data.split('_')
        lead_id = int(parts[1])
        is_target = parts[2] == 'yes'
        return handle_target_response(callback_id, chat_id, message_id, lead_id, is_target)
    
    elif data.startswith('status_'):
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
            
            goal_map = {
                'trial': 'trial_scheduled',
                'enrolled': 'enrolled',
                'thinking': 'considering',
                'irrelevant': 'rejected'
            }
            
            if status in goal_map:
                try:
                    client_for_goal = ym_client_id or f'telegram_{lead_id}'
                    send_metrika_goal(
                        goal=goal_map[status],
                        client_id=client_for_goal,
                        lead_id=lead_id,
                        params={
                            'status': status,
                            'source': 'telegram_admin',
                            'course': lead.get('course', 'unknown')
                        }
                    )
                    print(f"✅ Цель '{goal_map[status]}' отправлена в метрику для lead {lead_id}")
                except Exception as e:
                    print(f"❌ Ошибка отправки цели в метрику: {str(e)}")
            
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
    '''
    Отправка цели в Яндекс.Метрику через pixel tracking
    '''
    import urllib.request
    import urllib.parse
    import time
    
    counter_id = '104854671'
    
    if not client_id:
        print("[METRIKA] No client_id provided, skipping goal")
        return False
    
    timestamp = int(time.time())
    random_val = timestamp % 100000
    
    params = {
        'browser-info': f'ar:1:pv:1:rqnl:1:lt:{timestamp}:en:utf-8',
        'site-info': json.dumps({goal: 1}),
        'page-url': f'https://acting-school.poehali.dev/goal/{goal}',
        'page-ref': 'https://acting-school.poehali.dev/',
        'rn': str(random_val),
    }
    
    url = f'https://mc.yandex.ru/watch/{counter_id}?{urllib.parse.urlencode(params)}'
    
    try:
        req = urllib.request.Request(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://acting-school.poehali.dev/',
                'Cookie': f'_ym_uid={client_id}; _ym_d={timestamp}'
            }
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            result = response.read()
            print(f"[METRIKA] Goal sent: {goal}, client_id: {client_id}, status: {response.status}, response_length: {len(result)}")
            return True
    except Exception as e:
        print(f"[METRIKA] Failed to send goal: {e}")
        import traceback
        traceback.print_exc()
        return False

def handle_called(callback_id: str, chat_id: int, message_id: int, lead_id: int):
    '''Обработка нажатия кнопки "Позвонил клиенту"'''
    import urllib.request
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "UPDATE leads SET call_status = 'called', updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING *",
            (lead_id,)
        )
        lead = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
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
                f"📞 <b>ПОЗВОНИЛИ КЛИЕНТУ</b>\n"
                f"───────────────────\n\n"
                f"📞 <b>Телефон:</b> <code>{lead['phone']}</code>\n"
                f"{course_emoji} <b>Курс:</b> {course_name}\n"
                f"📅 <b>Дата:</b> {formatted_date}\n\n"
                f"<b>Клиент целевой и ему интересно?</b>"
            )
            
            url = f'https://api.telegram.org/bot{BOT_TOKEN}/editMessageText'
            data_update = json.dumps({
                'chat_id': chat_id,
                'message_id': message_id,
                'text': new_message,
                'parse_mode': 'HTML',
                'reply_markup': {
                    'inline_keyboard': [[
                        {'text': '✅ Да, целевой и интересно', 'callback_data': f'target_{lead_id}_yes'},
                        {'text': '❌ Нет, не заинтересован', 'callback_data': f'target_{lead_id}_no'}
                    ]]
                }
            }).encode('utf-8')
            
            req = urllib.request.Request(
                url,
                data=data_update,
                headers={'Content-Type': 'application/json'}
            )
            
            with urllib.request.urlopen(req) as response:
                pass
    
    except Exception as e:
        print(f"Error in handle_called: {e}")
    
    answer_url = f'https://api.telegram.org/bot{BOT_TOKEN}/answerCallbackQuery'
    answer_data = json.dumps({
        'callback_query_id': callback_id,
        'text': '✅ Отмечено: позвонили клиенту'
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

def handle_target_response(callback_id: str, chat_id: int, message_id: int, lead_id: int, is_target: bool):
    '''Обработка ответа о целевом клиенте и запуск WhatsApp рассылки'''
    import urllib.request
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            """UPDATE leads 
               SET is_target = %s, 
                   whatsapp_campaign_active = %s, 
                   status = %s,
                   updated_at = CURRENT_TIMESTAMP 
               WHERE id = %s RETURNING *""",
            (is_target, is_target, 'target_interested' if is_target else 'not_interested', lead_id)
        )
        lead = cur.fetchone()
        conn.commit()
        
        if is_target and lead:
            schedule_whatsapp_campaign(cur, conn, lead)
        
        cur.close()
        conn.close()
        
        if lead:
            from datetime import datetime
            created_at = lead['created_at']
            
            months_ru = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                         'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
            
            formatted_date = f"{created_at.day} {months_ru[created_at.month - 1]} {created_at.year} года в {created_at.strftime('%H:%M')}"
            
            course_emoji = '🎭' if lead.get('course') == 'acting' else '🎤' if lead.get('course') == 'oratory' else '❓'
            course_name = 'Актёрское мастерство' if lead.get('course') == 'acting' else 'Ораторское искусство' if lead.get('course') == 'oratory' else 'Не указан'
            
            status_text = '✅ ЦЕЛЕВОЙ И ИНТЕРЕСНО' if is_target else '❌ НЕ ЗАИНТЕРЕСОВАН'
            whatsapp_text = '\n🎯 <b>WhatsApp рассылка запущена!</b>' if is_target else ''
            
            new_message = (
                f"───────────────────\n"
                f"{status_text}\n"
                f"───────────────────\n\n"
                f"📞 <b>Телефон:</b> <code>{lead['phone']}</code>\n"
                f"{course_emoji} <b>Курс:</b> {course_name}\n"
                f"📅 <b>Дата:</b> {formatted_date}"
                f"{whatsapp_text}\n\n"
                f"<b>Отметьте статус клиента:</b>"
            )
            
            reply_markup = {
                'inline_keyboard': [[
                    {'text': '✅ Записался на пробное', 'callback_data': f'status_{lead_id}_trial'},
                    {'text': '🎓 Записался на обучение', 'callback_data': f'status_{lead_id}_enrolled'}
                ], [
                    {'text': '🤔 Думает', 'callback_data': f'status_{lead_id}_thinking'},
                    {'text': '❌ Нецелевой', 'callback_data': f'status_{lead_id}_irrelevant'}
                ]]
            } if is_target else None
            
            url = f'https://api.telegram.org/bot{BOT_TOKEN}/editMessageText'
            payload = {
                'chat_id': chat_id,
                'message_id': message_id,
                'text': new_message,
                'parse_mode': 'HTML'
            }
            if reply_markup:
                payload['reply_markup'] = reply_markup
            
            data_update = json.dumps(payload).encode('utf-8')
            
            req = urllib.request.Request(
                url,
                data=data_update,
                headers={'Content-Type': 'application/json'}
            )
            
            with urllib.request.urlopen(req) as response:
                pass
    
    except Exception as e:
        print(f"Error in handle_target_response: {e}")
        import traceback
        traceback.print_exc()
    
    answer_text = '🎯 WhatsApp рассылка запущена!' if is_target else 'Отмечено как не заинтересован'
    
    answer_url = f'https://api.telegram.org/bot{BOT_TOKEN}/answerCallbackQuery'
    answer_data = json.dumps({
        'callback_query_id': callback_id,
        'text': answer_text
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

def schedule_whatsapp_campaign(cur, conn, lead: dict):
    '''Создание очереди WhatsApp сообщений для прогрева клиента'''
    from datetime import datetime, timedelta
    
    course = lead.get('course')
    phone = lead.get('phone', '').replace('+', '').replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
    
    cur.execute(
        "SELECT * FROM whatsapp_templates WHERE active = TRUE AND (course = %s OR course IS NULL) ORDER BY delay_days",
        (course,)
    )
    templates = cur.fetchall()
    
    for template in templates:
        scheduled_time = datetime.now() + timedelta(days=template['delay_days'])
        
        message_text = template['content']
        if '{{instructor_name}}' in message_text:
            instructor = 'Казбек Меретуков' if course == 'acting' else 'Ольга Штерц'
            message_text = message_text.replace('{{instructor_name}}', instructor)
        
        file_url = template.get('file_url')
        file_name = template.get('file_name')
        file_type = template.get('file_type')
        
        cur.execute(
            """INSERT INTO whatsapp_queue 
               (lead_id, phone, message_template, message_text, scheduled_at, status, file_url, file_name, file_type)
               VALUES (%s, %s, %s, %s, %s, 'pending', %s, %s, %s)""",
            (lead['id'], phone, template['name'], message_text, scheduled_time, file_url, file_name, file_type)
        )
    
    conn.commit()
    print(f"Scheduled {len(templates)} WhatsApp messages for lead {lead['id']}")