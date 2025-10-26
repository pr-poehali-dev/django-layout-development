import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
import urllib.request

BOT_TOKEN = "8238321643:AAEV7kBinohHb-RSLah7VSBJ2XSsXTQUpW4"
ADMIN_CHAT_ID = os.environ.get('TELEGRAM_ADMIN_CHAT_ID', '')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage leads from contact forms
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with leads data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            cur.execute("SELECT * FROM leads ORDER BY created_at DESC")
            leads = cur.fetchall()
            result = [dict(row) for row in leads]
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result, default=str)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            phone = body_data.get('phone')
            source = body_data.get('source', 'website')
            course = body_data.get('course')
            
            if not phone:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Phone is required'})
                }
            
            cur.execute(
                "INSERT INTO leads (phone, source, course, status) VALUES (%s, %s, %s, 'new') RETURNING *",
                (phone, source, course)
            )
            lead = cur.fetchone()
            conn.commit()
            
            if ADMIN_CHAT_ID:
                try:
                    message_id = send_telegram_notification(dict(lead))
                    if message_id:
                        cur.execute(
                            "UPDATE leads SET message_id = %s WHERE id = %s",
                            (message_id, lead['id'])
                        )
                        conn.commit()
                except Exception as e:
                    print(f"Failed to send telegram notification: {e}")
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(lead), default=str)
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            lead_id = body_data.get('id')
            status = body_data.get('status')
            
            if not lead_id or not status:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID and status are required'})
                }
            
            cur.execute(
                "UPDATE leads SET status = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING *",
                (status, lead_id)
            )
            lead = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            if lead:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(lead), default=str)
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Lead not found'})
                }
        
        cur.close()
        conn.close()
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }

def send_telegram_notification(lead: dict):
    '''Отправка уведомления в Telegram о новой заявке'''
    from datetime import datetime
    
    created_at = lead.get('created_at')
    if isinstance(created_at, str):
        created_at = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
    
    months_ru = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    
    formatted_date = f"{created_at.day} {months_ru[created_at.month - 1]} {created_at.year} года в {created_at.strftime('%H:%M')}"
    
    course_emoji = '🎭' if lead.get('course') == 'acting' else '🎤' if lead.get('course') == 'oratory' else '❓'
    course_name = 'Актёрское мастерство' if lead.get('course') == 'acting' else 'Ораторское искусство' if lead.get('course') == 'oratory' else 'Не указан'
    
    message = (
        f"━━━━━━━━━━━━━━━━━━━\n"
        f"🔔 <b>НОВАЯ ЗАЯВКА</b>\n"
        f"━━━━━━━━━━━━━━━━━━━\n\n"
        f"📞 <b>Телефон:</b> <code>{lead.get('phone')}</code>\n"
        f"{course_emoji} <b>Курс:</b> {course_name}\n"
        f"📅 <b>Дата:</b> {formatted_date}\n\n"
        f"━━━━━━━━━━━━━━━━━━━"
    )
    
    url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    data = json.dumps({
        'chat_id': ADMIN_CHAT_ID,
        'text': message,
        'parse_mode': 'HTML',
        'reply_markup': {
            'inline_keyboard': [[
                {'text': '✅ Записался на пробное', 'callback_data': f'status_{lead.get("id")}_trial'},
                {'text': '🎓 Записался на обучение', 'callback_data': f'status_{lead.get("id")}_enrolled'}
            ], [
                {'text': '🤔 Думает', 'callback_data': f'status_{lead.get("id")}_thinking'},
                {'text': '❌ Нецелевой', 'callback_data': f'status_{lead.get("id")}_irrelevant'}
            ]]
        }
    }).encode('utf-8')
    
    req = urllib.request.Request(
        url,
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        return result.get('result', {}).get('message_id')