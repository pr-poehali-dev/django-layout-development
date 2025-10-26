import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { GalleryImage } from '@/lib/api';

interface GalleryManagerProps {
  gallery: GalleryImage[];
  newGalleryImage: {
    image_url: string;
    title: string;
    description: string;
  };
  editingGalleryImage: GalleryImage | null;
  onNewImageChange: (field: string, value: string) => void;
  onEditingImageChange: (field: string, value: string) => void;
  onCreate: () => void;
  onUpdate: () => void;
  onDelete: (id: number) => void;
  onStartEditing: (image: GalleryImage) => void;
  onCancelEditing: () => void;
}

export default function GalleryManager({
  gallery,
  newGalleryImage,
  editingGalleryImage,
  onNewImageChange,
  onEditingImageChange,
  onCreate,
  onUpdate,
  onDelete,
  onStartEditing,
  onCancelEditing
}: GalleryManagerProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Добавить изображение</CardTitle>
          <CardDescription>Новое изображение в галерею</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>URL изображения</Label>
            <Input
              value={newGalleryImage.image_url}
              onChange={(e) => onNewImageChange('image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label>Название</Label>
            <Input
              value={newGalleryImage.title}
              onChange={(e) => onNewImageChange('title', e.target.value)}
              placeholder="Название изображения"
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Input
              value={newGalleryImage.description}
              onChange={(e) => onNewImageChange('description', e.target.value)}
              placeholder="Описание"
            />
          </div>
          <Button onClick={onCreate} className="w-full">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить изображение
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Галерея ({gallery.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((image) => (
              <div key={image.id}>
                {editingGalleryImage?.id === image.id ? (
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div>
                        <Label>URL</Label>
                        <Input
                          value={editingGalleryImage.image_url}
                          onChange={(e) => onEditingImageChange('image_url', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Название</Label>
                        <Input
                          value={editingGalleryImage.title}
                          onChange={(e) => onEditingImageChange('title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Описание</Label>
                        <Input
                          value={editingGalleryImage.description}
                          onChange={(e) => onEditingImageChange('description', e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={onUpdate} size="sm" className="flex-1">
                          Сохранить
                        </Button>
                        <Button onClick={onCancelEditing} variant="outline" size="sm">
                          Отмена
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-1">{image.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{image.description}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onStartEditing(image)}
                          className="flex-1"
                        >
                          <Icon name="Edit" size={14} className="mr-1" />
                          Изменить
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(image.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
