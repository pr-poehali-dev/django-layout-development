import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export const getStatusBadge = (status: string) => {
  const config: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', icon: string, label: string }> = {
    pending: { variant: 'secondary', icon: 'Clock', label: 'В очереди' },
    sent: { variant: 'default', icon: 'CheckCircle2', label: 'Отправлено' },
    failed: { variant: 'destructive', icon: 'XCircle', label: 'Ошибка' }
  };

  const { variant, icon, label } = config[status] || { variant: 'outline', icon: 'HelpCircle', label: status };

  return (
    <Badge variant={variant} className="gap-1">
      <Icon name={icon} size={12} />
      {label}
    </Badge>
  );
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getCourseInfo = (course: string) => {
  const courses: Record<string, { emoji: string, name: string, color: string }> = {
    acting: { emoji: '🎭', name: 'Актёрское мастерство', color: 'bg-purple-100 text-purple-700' },
    oratory: { emoji: '🎤', name: 'Ораторское искусство', color: 'bg-blue-100 text-blue-700' }
  };
  return courses[course] || { emoji: '📚', name: 'Общее', color: 'bg-gray-100 text-gray-700' };
};
