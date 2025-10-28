import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { Template } from './types';

interface TemplateDialogProps {
  template: Template | null;
  loading: boolean;
  onChange: (template: Template) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function TemplateDialog({ 
  template, 
  loading, 
  onChange, 
  onSave, 
  onClose 
}: TemplateDialogProps) {
  if (!template) return null;

  return (
    <Dialog open={!!template} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Редактирование шаблона</DialogTitle>
          <DialogDescription>Измените параметры шаблона сообщения</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Название шаблона</Label>
            <Input
              id="title"
              value={template.title}
              onChange={(e) => onChange({ ...template, title: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="content">Текст сообщения</Label>
            <Textarea
              id="content"
              value={template.content}
              onChange={(e) => onChange({ ...template, content: e.target.value })}
              rows={8}
              className="mt-1 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Доступные переменные: {'{name}'}, {'{course}'}
            </p>
          </div>

          <div>
            <Label htmlFor="delay">Задержка отправки (дней)</Label>
            <Input
              id="delay"
              type="number"
              min="0"
              value={template.delay_days}
              onChange={(e) => onChange({ ...template, delay_days: parseInt(e.target.value) })}
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="active">Статус шаблона</Label>
              <p className="text-sm text-gray-600">
                {template.active ? 'Шаблон активен и будет использоваться' : 'Шаблон отключён'}
              </p>
            </div>
            <Switch
              id="active"
              checked={template.active}
              onCheckedChange={(checked) => onChange({ ...template, active: checked })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onSave}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Icon name="Save" className="mr-2" size={16} />
              Сохранить изменения
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
