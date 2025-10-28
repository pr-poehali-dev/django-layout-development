import { useState } from 'react';
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
  onFileUpload: (file: File) => Promise<string>;
}

export default function TemplateDialog({ 
  template, 
  loading, 
  onChange, 
  onSave, 
  onClose,
  onFileUpload 
}: TemplateDialogProps) {
  const [uploading, setUploading] = useState(false);

  if (!template) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileUrl = await onFileUpload(file);
      const fileType = file.type.startsWith('image/') ? 'image' 
        : file.type.startsWith('video/') ? 'video' 
        : file.type === 'application/pdf' ? 'pdf' 
        : 'document';
      
      onChange({
        ...template,
        file_url: fileUrl,
        file_type: fileType,
        file_name: file.name
      });
    } catch (error) {
      alert('Ошибка при загрузке файла');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    onChange({
      ...template,
      file_url: null,
      file_type: null,
      file_name: null
    });
  };

  const getFileIcon = () => {
    if (!template.file_type) return 'File';
    if (template.file_type === 'image') return 'Image';
    if (template.file_type === 'video') return 'Video';
    if (template.file_type === 'pdf') return 'FileText';
    return 'File';
  };

  return (
    <Dialog open={!!template} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

          <div>
            <Label>Прикрепить файл</Label>
            <div className="mt-2 space-y-3">
              {template.file_url ? (
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Icon name={getFileIcon()} size={20} className="text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm text-blue-900">{template.file_name}</div>
                    <a 
                      href={template.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Открыть файл
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ) : (
                <div>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*,video/*,.pdf"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Поддерживаются: изображения, видео, PDF (макс. 50 МБ)
                  </p>
                </div>
              )}
            </div>
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
              disabled={loading || uploading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {uploading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Save" className="mr-2" size={16} />
                  Сохранить изменения
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading || uploading}
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
