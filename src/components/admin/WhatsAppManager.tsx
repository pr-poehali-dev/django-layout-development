import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [selectedMessage, setSelectedMessage] = useState<QueueItem | null>(null);

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
      alert(`✅ Обработано: ${result.processed}\n📤 Отправлено: ${result.sent}\n❌ Ошибки: ${result.failed}`);
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
      alert('✅ Сообщение перемещено в очередь для немедленной отправки');
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
      alert('✅ Шаблон успешно обновлён');
      setEditingTemplate(null);
      loadData();
    } catch (error) {
      alert('Ошибка при обновлении шаблона');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
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

  const getCourseInfo = (course: string) => {
    const courses: Record<string, { emoji: string, name: string, color: string }> = {
      acting: { emoji: '🎭', name: 'Актёрское мастерство', color: 'bg-purple-100 text-purple-700' },
      oratory: { emoji: '🎤', name: 'Ораторское искусство', color: 'bg-blue-100 text-blue-700' }
    };
    return courses[course] || { emoji: '📚', name: 'Общее', color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon name="MessageCircle" className="text-green-600" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">WhatsApp рассылки</h2>
          </div>
          <p className="text-gray-600">Управление автоматическими рассылками через Green API</p>
        </div>
        <Button 
          onClick={handleProcessQueue} 
          disabled={loading}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          <Icon name="Send" className="mr-2" size={18} />
          Отправить сейчас
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="text-green-700">Активных кампаний</CardDescription>
                <Icon name="Zap" className="text-green-500" size={20} />
              </div>
              <CardTitle className="text-4xl text-green-600">{stats.active_campaigns}</CardTitle>
            </CardHeader>
          </Card>
          
          {stats.stats.map((stat) => {
            const config: Record<string, { icon: string, gradient: string, textColor: string }> = {
              pending: { icon: 'Clock', gradient: 'from-yellow-50 to-white', textColor: 'text-yellow-600' },
              sent: { icon: 'CheckCircle2', gradient: 'from-blue-50 to-white', textColor: 'text-blue-600' },
              failed: { icon: 'XCircle', gradient: 'from-red-50 to-white', textColor: 'text-red-600' }
            };
            
            const { icon, gradient, textColor } = config[stat.status] || { icon: 'HelpCircle', gradient: 'from-gray-50 to-white', textColor: 'text-gray-600' };
            const labels: Record<string, string> = {
              pending: 'В очереди',
              sent: 'Отправлено',
              failed: 'Ошибок'
            };

            return (
              <Card key={stat.status} className={`bg-gradient-to-br ${gradient}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className={textColor}>{labels[stat.status]}</CardDescription>
                    <Icon name={icon} className={textColor} size={20} />
                  </div>
                  <CardTitle className={`text-4xl ${textColor}`}>{stat.count}</CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}

      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 bg-gray-100">
          <TabsTrigger value="queue" className="gap-2">
            <Icon name="List" size={16} />
            Очередь сообщений
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Icon name="FileText" size={16} />
            Шаблоны
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-gray-900' : ''}
            >
              <Icon name="Grid" size={14} className="mr-1" />
              Все
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
              className={filter === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            >
              <Icon name="Clock" size={14} className="mr-1" />
              В очереди
            </Button>
            <Button
              variant={filter === 'sent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('sent')}
              className={filter === 'sent' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            >
              <Icon name="CheckCircle2" size={14} className="mr-1" />
              Отправлено
            </Button>
            <Button
              variant={filter === 'failed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('failed')}
              className={filter === 'failed' ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              <Icon name="XCircle" size={14} className="mr-1" />
              Ошибки
            </Button>
          </div>

          {queue.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <Icon name="Inbox" size={48} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">Нет сообщений в очереди</p>
                <p className="text-gray-400 text-sm mt-1">Новые сообщения появятся здесь автоматически</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {queue.map((item) => {
                const courseInfo = getCourseInfo(item.course);
                return (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge className={`${courseInfo.color} border-0 font-medium`}>
                              {courseInfo.emoji} {courseInfo.name}
                            </Badge>
                            {getStatusBadge(item.status)}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Icon name="User" size={16} className="text-gray-400" />
                              <span className="font-medium">{item.lead_name}</span>
                              <span className="text-gray-400">•</span>
                              <span className="font-mono text-sm text-gray-600">{item.phone}</span>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <Icon name="FileText" size={16} className="text-gray-400 mt-0.5" />
                              <div>
                                <div className="font-medium text-sm text-gray-900">{item.message_template}</div>
                                <div className="text-sm text-gray-600 mt-1 line-clamp-2">{item.message_text}</div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Icon name="Calendar" size={14} />
                                <span>Запланировано: {formatDate(item.scheduled_at)}</span>
                              </div>
                              {item.sent_at && (
                                <div className="flex items-center gap-1">
                                  <Icon name="Send" size={14} />
                                  <span>Отправлено: {formatDate(item.sent_at)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex md:flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMessage(item)}
                            className="flex-1 md:flex-none"
                          >
                            <Icon name="Eye" size={14} className="mr-1" />
                            Просмотр
                          </Button>
                          {item.status === 'pending' && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleSendNow(item.id)}
                              disabled={loading}
                              className="flex-1 md:flex-none bg-green-600 hover:bg-green-700"
                            >
                              <Icon name="Send" size={14} className="mr-1" />
                              Отправить
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {templates.map((template) => {
              const courseInfo = template.course ? getCourseInfo(template.course) : null;
              return (
                <Card key={template.id} className={`${!template.active ? 'opacity-60' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <CardTitle className="text-xl">{template.title}</CardTitle>
                          {courseInfo && (
                            <Badge className={`${courseInfo.color} border-0 font-medium`}>
                              {courseInfo.emoji} {courseInfo.name}
                            </Badge>
                          )}
                          <Badge variant={template.active ? 'default' : 'secondary'} className="gap-1">
                            <Icon name={template.active ? 'CheckCircle2' : 'CircleOff'} size={12} />
                            {template.active ? 'Активен' : 'Отключён'}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          Отправка через {template.delay_days} {template.delay_days === 1 ? 'день' : template.delay_days < 5 ? 'дня' : 'дней'}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTemplate(template)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{template.content}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Просмотр сообщения</DialogTitle>
            <DialogDescription>Полная информация о сообщении в очереди</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={`${getCourseInfo(selectedMessage.course).color} border-0 font-medium text-base px-3 py-1`}>
                  {getCourseInfo(selectedMessage.course).emoji} {getCourseInfo(selectedMessage.course).name}
                </Badge>
                {getStatusBadge(selectedMessage.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">Имя</Label>
                  <p className="font-medium text-lg">{selectedMessage.lead_name}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Телефон</Label>
                  <p className="font-mono font-medium text-lg">{selectedMessage.phone}</p>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 mb-2 block">Шаблон</Label>
                <p className="font-medium">{selectedMessage.message_template}</p>
              </div>

              <div>
                <Label className="text-gray-600 mb-2 block">Текст сообщения</Label>
                <ScrollArea className="h-[200px] w-full rounded-lg border bg-gray-50 p-4">
                  <p className="text-sm whitespace-pre-wrap">{selectedMessage.message_text}</p>
                </ScrollArea>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label className="text-gray-600">Запланировано</Label>
                  <p className="font-medium">{formatDate(selectedMessage.scheduled_at)}</p>
                </div>
                {selectedMessage.sent_at && (
                  <div>
                    <Label className="text-gray-600">Отправлено</Label>
                    <p className="font-medium">{formatDate(selectedMessage.sent_at)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingTemplate} onOpenChange={() => setEditingTemplate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Редактирование шаблона</DialogTitle>
            <DialogDescription>Измените параметры шаблона сообщения</DialogDescription>
          </DialogHeader>
          {editingTemplate && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Название шаблона</Label>
                <Input
                  id="title"
                  value={editingTemplate.title}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="content">Текст сообщения</Label>
                <Textarea
                  id="content"
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
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
                  value={editingTemplate.delay_days}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, delay_days: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="active">Статус шаблона</Label>
                  <p className="text-sm text-gray-600">
                    {editingTemplate.active ? 'Шаблон активен и будет использоваться' : 'Шаблон отключён'}
                  </p>
                </div>
                <Switch
                  id="active"
                  checked={editingTemplate.active}
                  onCheckedChange={(checked) => setEditingTemplate({ ...editingTemplate, active: checked })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleUpdateTemplate(editingTemplate)}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Icon name="Save" className="mr-2" size={16} />
                  Сохранить изменения
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingTemplate(null)}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
