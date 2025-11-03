import json
import os
from typing import Dict, Any
from datetime import datetime
from urllib.parse import quote
import psycopg2
from psycopg2.extras import RealDictCursor

def generate_sitemap() -> Dict[str, Any]:
    '''Generate dynamic sitemap.xml from database'''
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("SELECT slug, title, image_url, excerpt, content, updated_at, created_at FROM blog_posts ORDER BY created_at DESC")
        posts = cur.fetchall()
        
        cur.close()
        conn.close()
        
        BASE_URL = 'https://acting-school.poehali.dev'
        today = datetime.now().strftime('%Y-%m-%d')
        
        static_pages = [
            {'loc': f'{BASE_URL}/', 'priority': '1.0', 'changefreq': 'weekly', 'lastmod': '2025-10-27'},
            {'loc': f'{BASE_URL}/oratory', 'priority': '0.9', 'changefreq': 'weekly', 'lastmod': '2025-10-27'},
            {'loc': f'{BASE_URL}/team', 'priority': '0.7', 'changefreq': 'monthly', 'lastmod': '2025-10-27'},
            {'loc': f'{BASE_URL}/reviews', 'priority': '0.8', 'changefreq': 'weekly', 'lastmod': '2025-10-27'},
            {'loc': f'{BASE_URL}/blog', 'priority': '0.8', 'changefreq': 'daily', 'lastmod': today},
            {'loc': f'{BASE_URL}/contacts', 'priority': '0.6', 'changefreq': 'monthly', 'lastmod': today},
        ]
        
        xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
        
        for page in static_pages:
            xml += '  <url>\n'
            xml += f'    <loc>{page["loc"]}</loc>\n'
            xml += f'    <lastmod>{page["lastmod"]}</lastmod>\n'
            xml += f'    <changefreq>{page["changefreq"]}</changefreq>\n'
            xml += f'    <priority>{page["priority"]}</priority>\n'
            xml += '  </url>\n'
        
        for post in posts:
            if not post['slug']:
                continue
            
            lastmod = post['updated_at'] or post['created_at'] or datetime.now()
            formatted_date = lastmod.strftime('%Y-%m-%d') if hasattr(lastmod, 'strftime') else str(lastmod).split('T')[0]
            encoded_slug = quote(post['slug'])
            
            xml += '  <url>\n'
            xml += f'    <loc>{BASE_URL}/blog/{encoded_slug}</loc>\n'
            xml += f'    <lastmod>{formatted_date}</lastmod>\n'
            xml += '    <changefreq>monthly</changefreq>\n'
            xml += '    <priority>0.7</priority>\n'
            
            if post.get('image_url'):
                title = str(post.get('title', '')).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
                caption = str(post.get('excerpt') or post.get('content', '')[:100]).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
                
                xml += '    <image:image>\n'
                xml += f'      <image:loc>{post["image_url"]}</image:loc>\n'
                xml += f'      <image:title>{title}</image:title>\n'
                xml += f'      <image:caption>{caption}</image:caption>\n'
                xml += '    </image:image>\n'
            
            xml += '  </url>\n'
        
        xml += '</urlset>'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/xml; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'isBase64Encoded': False,
            'body': xml
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage editable site content + generate sitemap
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with content data or sitemap XML
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
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        params = event.get('queryStringParameters', {})
        
        if method == 'GET' and params and params.get('sitemap') == 'true':
            return generate_sitemap()
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            key = params.get('key') if params else None
            page = params.get('page') if params else None
            
            if key:
                escaped_key = key.replace("'", "''")
                cur.execute(f"SELECT * FROM editable_content WHERE content_key = '{escaped_key}'")
                content = cur.fetchone()
                result = dict(content) if content else None
            elif page:
                escaped_page = page.replace("'", "''")
                cur.execute(f"SELECT * FROM editable_content WHERE page = '{escaped_page}' ORDER BY content_key")
                content = cur.fetchall()
                result = [dict(row) for row in content]
            else:
                cur.execute("SELECT id, key, value, updated_at FROM site_content ORDER BY key")
                content = cur.fetchall()
                result = [dict(row) for row in content]
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            content_key = body_data.get('key')
            content_value = body_data.get('value')
            
            if not content_key or content_value is None:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'key and value are required'}),
                    'isBase64Encoded': False
                }
            
            escaped_key = content_key.replace("'", "''")
            escaped_value = str(content_value).replace("'", "''") if content_value else ''
            
            cur.execute(
                f"""
                INSERT INTO site_content (key, value, updated_at)
                VALUES ('{escaped_key}', '{escaped_value}', CURRENT_TIMESTAMP)
                ON CONFLICT (key)
                DO UPDATE SET 
                    value = EXCLUDED.value, 
                    updated_at = CURRENT_TIMESTAMP
                RETURNING *
                """
            )
            updated = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(updated), default=str),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }