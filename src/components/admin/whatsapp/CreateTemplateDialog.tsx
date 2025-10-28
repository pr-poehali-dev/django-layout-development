import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CreateTemplateDialogProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onCreate: (template: any) => void;
  onFileUpload: (file: File) => Promise<string>;
}

export default function CreateTemplateDialog({ 
  open, 
  loading, 
  onClose, 
  onCreate,
  onFileUpload
}: CreateTemplateDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    content: '',
    delay_days: 0,
    course: '',
    file_url: '',
    file_type: '',
    file_name: ''
  });
  const [uploading, setUploading] = useState(false);

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
      
      setFormData({
        ...formData,
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
    setFormData({
      ...formData,
      file_url: '',
      file_type: '',
      file_name: ''
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.content) {
      alert('Заполните название и текст сообщения');
      return;
    }
    onCreate(formData);
    setFormData({
      name: '',
      title: '',
      content: '',
      delay_days: 0,
      course: '',
      file_url: '',
      file_type: '',
      file_name: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Создание нового шаблона</DialogTitle>
          <DialogDescription>Создайте шаблон сообщения для автоматической рассылки</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Название шаблона *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Например: Приветствие после регистрации"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="name">Идентификатор (name)</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="welcome_day_1"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">Используется для идентификации в системе</p>
          </div>

          <div>
            <Label htmlFor="content">Текст сообщения *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              placeholder="Привет, {name}! Спасибо за интерес к курсу {course}..."
              className="mt-1 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Доступные переменные: {'{name}'}, {'{course}'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="delay">Задержка отправки (дней)</Label>
              <Input
                id="delay"
                type="number"
                min="0"
                value={formData.delay_days}
                onChange={(e) => setFormData({ ...formData, delay_days: parseInt(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="course">Курс</Label>
              <Select
                value={formData.course}
                onValueChange={(value) => setFormData({ ...formData, course: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Выберите курс" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все курсы</SelectItem>
                  <SelectItem value="acting">🎭 Актёрское мастерство</SelectItem>
                  <SelectItem value="oratory">🎤 Ораторское искусство</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Прикрепить файл (опционально)</Label>
            <div className="mt-2 space-y-3">
              {formData.file_url ? (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon name={formData.file_type === 'image' ? 'Image' : formData.file_type === 'video' ? 'Video' : 'FileText'} size={20} className="text-green-600" />
                      <span className="font-medium text-sm text-green-900">{formData.file_name}</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Файл загружен</p>
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

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleSubmit}
              disabled={loading || uploading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {uploading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  Загрузка файла...
                </>
              ) : (
                <>
                  <Icon name="Plus" className="mr-2" size={16} />
                  Создать шаблон
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
