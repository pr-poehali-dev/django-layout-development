import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage gallery images, reviews, FAQ, blog, team
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        params = event.get('queryStringParameters', {})
        resource = params.get('resource', 'gallery') if params else 'gallery'
        
        if method == 'GET':
            if resource == 'gallery':
                cur.execute("SELECT * FROM gallery_images ORDER BY order_num")
            elif resource == 'reviews':
                cur.execute("SELECT * FROM reviews ORDER BY order_num")
            elif resource == 'faq':
                cur.execute("SELECT * FROM faq ORDER BY order_num")
            elif resource == 'blog':
                cur.execute("SELECT * FROM blog_posts ORDER BY created_at DESC")
            elif resource == 'team':
                cur.execute("SELECT * FROM team_members ORDER BY sort_order")
            
            items = cur.fetchall()
            result = [dict(row) for row in items]
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result, default=str)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            if resource == 'gallery':
                cur.execute(
                    "INSERT INTO gallery_images (url, caption, order_num) VALUES (%s, %s, %s) RETURNING *",
                    (body_data.get('url'), body_data.get('caption'), body_data.get('order_num', 0))
                )
            elif resource == 'reviews':
                cur.execute(
                    "INSERT INTO reviews (name, text, rating, image_url, order_num) VALUES (%s, %s, %s, %s, %s) RETURNING *",
                    (body_data.get('name'), body_data.get('text'), body_data.get('rating', 5), body_data.get('image_url'), body_data.get('order_num', 0))
                )
            elif resource == 'faq':
                cur.execute(
                    "INSERT INTO faq (question, answer, order_num) VALUES (%s, %s, %s) RETURNING *",
                    (body_data.get('question'), body_data.get('answer'), body_data.get('order_num', 0))
                )
            elif resource == 'blog':
                cur.execute(
                    "INSERT INTO blog_posts (title, slug, content, excerpt, image_url, published) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *",
                    (body_data.get('title'), body_data.get('slug'), body_data.get('content'), body_data.get('excerpt'), body_data.get('image_url'), body_data.get('published', False))
                )
            elif resource == 'team':
                cur.execute(
                    "INSERT INTO team_members (name, role, bio, photo_url, sort_order) VALUES (%s, %s, %s, %s, %s) RETURNING *",
                    (body_data.get('name'), body_data.get('role'), body_data.get('bio'), body_data.get('photo_url'), body_data.get('sort_order', 0))
                )
            
            item = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(item), default=str)
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            item_id = params.get('id') if params else None
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID is required'})
                }
            
            if resource == 'team':
                cur.execute(
                    "UPDATE team_members SET name = %s, role = %s, bio = %s, photo_url = %s, sort_order = %s WHERE id = %s RETURNING *",
                    (body_data.get('name'), body_data.get('role'), body_data.get('bio'), body_data.get('photo_url'), body_data.get('sort_order', 0), item_id)
                )
            
            item = cur.fetchone()
            
            if not item:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Item not found'})
                }
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(item), default=str)
            }
        
        elif method == 'DELETE':
            item_id = params.get('id') if params else None
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID is required'})
                }
            
            if resource == 'team':
                cur.execute("DELETE FROM team_members WHERE id = %s", (item_id,))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True})
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