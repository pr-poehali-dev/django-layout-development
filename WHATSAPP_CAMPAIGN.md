# 📱 WhatsApp прогрев клиентов

## Как работает система

### Флоу процесса:

```
1. Клиент оставляет заявку на сайте
   ↓
2. Уведомление приходит в Telegram бот
   ↓
3. Менеджер звонит клиенту и нажимает "📞 Позвонил клиенту"
   ↓
4. Бот спрашивает: "Клиент целевой и ему интересно?"
   ↓
5. Менеджер выбирает:
   ✅ "Да, целевой и интересно" → запуск WhatsApp рассылки
   ❌ "Нет, не заинтересован" → рассылка НЕ запускается
   ↓
6. WhatsApp сообщения отправляются автоматически по расписанию
```

## 🎯 Схема прогрева

По умолчанию настроены следующие шаблоны:

| День | Шаблон | Описание |
|------|--------|----------|
| 0 | `welcome` | Приветствие сразу после активации |
| 1 | `day1_acting` / `day1_oratory` | Первое прогревающее сообщение по курсу |
| 3 | `day3` | История успеха ученика / кейс |
| 7 | `day7` | Последнее предложение записаться |

**Важно:** Сообщения отправляются только целевым клиентам, которых менеджер пометил как "Целевой и интересно".

## ⚙️ Настройка шаблонов

Шаблоны хранятся в таблице `whatsapp_templates`. Можно:

### Добавить новый шаблон:
```sql
INSERT INTO whatsapp_templates (name, title, content, delay_days, course, active)
VALUES (
  'day5_case',
  'Кейс - День 5',
  'Недавно наша ученица Анна выступала на конференции на 500 человек! А ведь пришла она с дрожью в коленках...',
  5,
  'oratory',
  TRUE
);
```

### Редактировать существующий:
```sql
UPDATE whatsapp_templates 
SET content = 'Новый текст сообщения'
WHERE name = 'welcome';
```

### Отключить шаблон:
```sql
UPDATE whatsapp_templates 
SET active = FALSE
WHERE name = 'day7';
```

### Переменные в шаблонах:
- `{{instructor_name}}` — автоматически заменяется на:
  - "Казбек Меретуков" для актёрского мастерства
  - "Ольга Штерц" для ораторского искусства

## 📤 Как запускается отправка

### Автоматически (рекомендуется):
Настройте cron-задачу для вызова функции каждые 30 минут:
```
*/30 * * * * curl https://functions.poehali.dev/056bc93d-3039-4809-b29d-580752202bea
```

### Вручную:
Откройте в браузере:
```
https://functions.poehali.dev/056bc93d-3039-4809-b29d-580752202bea
```

Функция обработает очередь и отправит до 10 сообщений за раз.

## 📊 Мониторинг отправок

### Проверить очередь:
```sql
SELECT 
  wq.id,
  wq.phone,
  wq.message_template,
  wq.scheduled_at,
  wq.sent_at,
  wq.status,
  l.phone as lead_phone,
  l.course
FROM whatsapp_queue wq
LEFT JOIN leads l ON wq.lead_id = l.id
WHERE wq.status = 'pending'
ORDER BY wq.scheduled_at;
```

### Статистика по статусам:
```sql
SELECT 
  status,
  COUNT(*) as count
FROM whatsapp_queue
GROUP BY status;
```

### Последние отправленные:
```sql
SELECT 
  wq.phone,
  wq.message_template,
  wq.sent_at,
  wq.status
FROM whatsapp_queue wq
WHERE wq.status = 'sent'
ORDER BY wq.sent_at DESC
LIMIT 20;
```

### Ошибки отправки:
```sql
SELECT 
  wq.phone,
  wq.message_template,
  wq.error_message,
  wq.updated_at
FROM whatsapp_queue wq
WHERE wq.status = 'failed'
ORDER BY wq.updated_at DESC;
```

## 🔧 Green API настройка

### Данные подключения:
- **API URL**: https://1105.api.green-api.com
- **Instance ID**: 1105359047
- **Телефон**: +79283443439
- **Статус**: Авторизован

### Как проверить статус инстанса:
```bash
curl https://1105.api.green-api.com/waInstance1105359047/getStateInstance/3dbfcbea2a8d478db531df9f4ca22d2a59a65d7f32e74a5288
```

Ответ должен быть: `{"stateInstance": "authorized"}`

### Тестовая отправка:
```bash
curl -X POST https://functions.poehali.dev/056bc93d-3039-4809-b29d-580752202bea \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "79283443439",
    "message": "Тестовое сообщение из системы 👋"
  }'
```

## 🛠️ Структура БД

### Таблица `leads`:
- `call_status` — статус звонка (not_called, called, no_answer)
- `is_target` — целевой клиент (TRUE/FALSE)
- `whatsapp_campaign_active` — активна ли рассылка (TRUE/FALSE)
- `last_whatsapp_sent_at` — время последней отправки

### Таблица `whatsapp_queue`:
- `lead_id` — ID клиента
- `phone` — номер телефона (формат: 79283443439)
- `message_template` — название шаблона
- `message_text` — текст сообщения
- `scheduled_at` — время запланированной отправки
- `sent_at` — время фактической отправки
- `status` — статус (pending, sent, failed)
- `error_message` — текст ошибки при неудаче
- `green_api_response` — ответ от Green API (JSON)

### Таблица `whatsapp_templates`:
- `name` — уникальное имя шаблона
- `title` — заголовок для админки
- `content` — текст сообщения
- `delay_days` — через сколько дней отправлять
- `course` — для какого курса (acting, oratory, NULL = для всех)
- `active` — активен ли шаблон

## ✅ Чек-лист проверки

1. ✅ Green API авторизован (статус "authorized")
2. ✅ Секреты добавлены в проект (GREEN_API_URL, GREEN_API_INSTANCE, GREEN_API_TOKEN)
3. ✅ Backend функции развернуты
4. ✅ Шаблоны созданы в БД
5. ✅ Telegram бот обновлён с новыми кнопками
6. ⏳ Настроить cron для автоматической отправки
7. ⏳ Протестировать полный цикл: заявка → звонок → WhatsApp

## 🚀 Тестирование системы

### Шаг 1: Создать тестовую заявку
Оставьте заявку на сайте со своим номером телефона.

### Шаг 2: Telegram бот
Должно прийти уведомление с кнопкой "📞 Позвонил клиенту".

### Шаг 3: Нажать кнопку
Бот спросит: "Клиент целевой и ему интересно?" → выберите "✅ Да".

### Шаг 4: Проверить очередь
```sql
SELECT * FROM whatsapp_queue WHERE phone LIKE '%ВАШ_ТЕЛЕФОН%';
```
Должны появиться записи со статусом `pending`.

### Шаг 5: Запустить отправку
Откройте: https://functions.poehali.dev/056bc93d-3039-4809-b29d-580752202bea

### Шаг 6: Проверить WhatsApp
На ваш номер должно прийти приветственное сообщение!

## ❓ FAQ

**Q: Сколько сообщений отправляется за раз?**  
A: Максимум 10 за один запуск функции (чтобы не превысить лимиты Green API).

**Q: Что если сообщение не отправилось?**  
A: Статус станет `failed`, ошибка сохранится в `error_message`. Можно попробовать переотправить вручную.

**Q: Можно ли остановить рассылку для клиента?**  
A: Да, выполните:
```sql
UPDATE leads SET whatsapp_campaign_active = FALSE WHERE id = <ID_КЛИЕНТА>;
UPDATE whatsapp_queue SET status = 'cancelled' WHERE lead_id = <ID_КЛИЕНТА> AND status = 'pending';
```

**Q: Как изменить расписание отправки?**  
A: Измените `delay_days` в таблице `whatsapp_templates` для нужного шаблона.

**Q: Green API перестал работать?**  
A: Проверьте статус инстанса через API, возможно нужно перелогиниться через QR-код.

---

**Автор системы:** poehali.dev  
**Дата создания:** 27 октября 2025
