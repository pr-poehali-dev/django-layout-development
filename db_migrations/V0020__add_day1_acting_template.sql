-- Add missing day1_acting template for acting course
INSERT INTO whatsapp_templates (name, title, content, delay_days, course, active)
VALUES (
  'day1_acting',
  'День 1 - Актёрское мастерство',
  'Добрый день! 🎭

Сегодня первый день вашего пути в актёрском мастерстве с {{instructor_name}}.

Мы подготовили для вас специальные материалы, которые помогут начать занятия максимально эффективно.

Если возникнут вопросы - пишите, всегда на связи!',
  1,
  'acting',
  true
)
ON CONFLICT (name) DO NOTHING;