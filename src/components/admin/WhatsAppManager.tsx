import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';

interface WhatsAppManagerProps {
  token: string;
}

interface QueueItem {
  id: number;
  phone: string;
  message_text: string;
  message_template: string;
  scheduled_at: string;
  sent_at: string | null;
  status: string;
  lead_phone: string;
  lead_name: string;
  course: string;
}

interface Template {
  id: number;
  name: string;
  title: string;
  content: string;
  delay_days: number;
  course: string | null;
  active: boolean;
}

interface Stats {
  stats: Array<{ status: string; count: number }>;
  active_campaigns: number;
}

export default function WhatsAppManager({ token }: WhatsAppManagerProps) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  useEffect(() => {
    loadData();
  }, [token, filter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [queueData, templatesData, statsData] = await Promise.all([
        api.whatsapp.getQueue(token, filter === 'all' ? undefined : filter),
        api.whatsapp.getTemplates(token),
        api.whatsapp.getStats(token)
      ]);
      
      setQueue(queueData);
      setTemplates(templatesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading WhatsApp data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessQueue = async () => {
    setLoading(true);
    try {
      const result = await api.whatsapp.processQueue();
      alert(`Обработано: ${result.processed}, Отправлено: ${result.sent}, Ошибки: ${result.failed}`);
      loadData();
    } catch (error) {
      alert('Ошибка при обработке очереди');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNow = async (queueId: number) => {
    setLoading(true);
    try {
      await api.whatsapp.sendNow(queueId, token);
      alert('Сообщение перемещено в очередь для немедленной отправки');
      loadData();
    } catch (error) {
      alert('Ошибка при перемещении сообщения');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTemplate = async (template: Template) => {
    setLoading(true);
    try {
      await api.whatsapp.updateTemplate(template, token);
      alert('Шаблон обновлён');
      setEditingTemplate(null);
      loadData();
    } catch (error) {
      alert('Ошибка при обновлении шаблона');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      sent: 'default',
      failed: 'destructive'
    };
    
    const labels: Record<string, string> = {
      pending: 'В очереди',
      sent: 'Отправлено',
      failed: 'Ошибка'
    };

    return <Badge variant={variants[status] || 'outline'}>{labels[status] || status}</Badge>;
  };

  const formatDate = (dateString: string) => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">WhatsApp рассылки</h2>
          <p className="text-muted-foreground">Управление автоматическими рассылками через Green API</p>
        </div>
        <Button onClick={handleProcessQueue} disabled={loading}>
          <Icon name="Send" className="mr-2" size={16} />
          Отправить сейчас
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Активных кампаний</CardDescription>
              <CardTitle className="text-3xl">{stats.active_campaigns}</CardTitle>
            </CardHeader>
          </Card>
          {stats.stats.map((stat) => (
            <Card key={stat.status}>
              <CardHeader className="pb-3">
                <CardDescription>{stat.status === 'pending' ? 'В очереди' : stat.status === 'sent' ? 'Отправлено' : 'Ошибок'}</CardDescription>
                <CardTitle className="text-3xl">{stat.count}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="queue" className="w-full">
        <TabsList>
          <TabsTrigger value="queue">Очередь сообщений</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Все
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
            >
              В очереди
            </Button>
            <Button
              variant={filter === 'sent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('sent')}
            >
              Отправлено
            </Button>
            <Button
              variant={filter === 'failed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('failed')}
            >
              Ошибки
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Шаблон</TableHead>
                    <TableHead>Курс</TableHead>
                    <TableHead>Запланировано</TableHead>
                    <TableHead>Отправлено</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queue.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        Нет сообщений в очереди
                      </TableCell>
                    </TableRow>
                  ) : (
                    queue.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">{item.phone}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{item.message_template}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">{item.message_text}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.course === 'acting' ? '🎭 Актёрское' : item.course === 'oratory' ? '🎤 Ораторское' : '—'}
                        </TableCell>
                        <TableCell className="text-sm">{formatDate(item.scheduled_at)}</TableCell>
                        <TableCell className="text-sm">{formatDate(item.sent_at)}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          {item.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSendNow(item.id)}
                              disabled={loading}
                            >
                              <Icon name="Send" size={14} />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription>
                      День {template.delay_days} • {template.course === 'acting' ? 'Актёрское мастерство' : template.course === 'oratory' ? 'Ораторское искусство' : 'Все курсы'}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={template.active ? 'default' : 'secondary'}>
                      {template.active ? 'Активен' : 'Неактивен'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingTemplate(editingTemplate?.id === template.id ? null : template)}
                    >
                      <Icon name={editingTemplate?.id === template.id ? 'X' : 'Edit'} size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingTemplate?.id === template.id ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Заголовок</Label>
                      <Input
                        value={editingTemplate.title}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Текст сообщения</Label>
                      <Textarea
                        value={editingTemplate.content}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                        rows={5}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Через сколько дней</Label>
                        <Input
                          type="number"
                          value={editingTemplate.delay_days}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, delay_days: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label>Активен</Label>
                        <div className="flex items-center h-10">
                          <input
                            type="checkbox"
                            checked={editingTemplate.active}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, active: e.target.checked })}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleUpdateTemplate(editingTemplate)} disabled={loading}>
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{template.content}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
