import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { SiteContent } from '@/lib/api';

interface ContentManagerProps {
  content: SiteContent[];
  editingKey: string;
  editingValue: string;
  onStartEditing: (item: SiteContent) => void;
  onEditingKeyChange: (key: string) => void;
  onEditingValueChange: (value: string) => void;
  onUpdate: () => void;
}

export default function ContentManager({
  content,
  editingKey,
  editingValue,
  onStartEditing,
  onEditingKeyChange,
  onEditingValueChange,
  onUpdate
}: ContentManagerProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Редактирование контента</CardTitle>
          <CardDescription>Изменяйте текстовое содержимое сайта</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Ключ</Label>
            <Input
              value={editingKey}
              onChange={(e) => onEditingKeyChange(e.target.value)}
              placeholder="hero_title"
            />
          </div>
          <div>
            <Label>Значение</Label>
            <Input
              value={editingValue}
              onChange={(e) => onEditingValueChange(e.target.value)}
              placeholder="Новое значение"
            />
          </div>
          <Button onClick={onUpdate} className="w-full">
            Обновить контент
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список контента</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {content.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-primary">{item.key}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {item.value}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStartEditing(item)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
