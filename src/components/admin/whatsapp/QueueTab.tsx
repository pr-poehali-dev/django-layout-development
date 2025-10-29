import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { QueueItem } from './types';
import { formatDate, getCourseInfo } from './utils';
import StatusBadge from './StatusBadge';

interface QueueTabProps {
  queue: QueueItem[];
  filter: string;
  loading: boolean;
  onFilterChange: (filter: string) => void;
  onSendNow: (id: number) => void;
  onViewMessage: (item: QueueItem) => void;
  onDelete: (id: number) => void;
}

export default function QueueTab({ 
  queue, 
  filter, 
  loading, 
  onFilterChange, 
  onSendNow, 
  onViewMessage,
  onDelete
}: QueueTabProps) {
  const groupedQueue = queue.reduce((acc, item) => {
    const key = `${item.phone}_${item.lead_id}`;
    if (!acc[key]) {
      acc[key] = {
        phone: item.phone,
        lead_name: item.lead_name,
        lead_id: item.lead_id,
        course: item.course,
        messages: []
      };
    }
    acc[key].messages.push(item);
    return acc;
  }, {} as Record<string, { phone: string; lead_name: string; lead_id: number; course: string | null; messages: QueueItem[] }>);

  const groups = Object.values(groupedQueue).sort((a, b) => {
    const aNext = a.messages.find(m => m.status === 'pending');
    const bNext = b.messages.find(m => m.status === 'pending');
    if (aNext && !bNext) return -1;
    if (!aNext && bNext) return 1;
    if (aNext && bNext) {
      return new Date(aNext.scheduled_at).getTime() - new Date(bNext.scheduled_at).getTime();
    }
    return b.lead_id - a.lead_id;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('all')}
          className={filter === 'all' ? 'bg-gray-900' : ''}
        >
          <Icon name="Grid" size={14} className="mr-1" />
          Все
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('pending')}
          className={filter === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
        >
          <Icon name="Clock" size={14} className="mr-1" />
          В очереди
        </Button>
        <Button
          variant={filter === 'sent' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('sent')}
          className={filter === 'sent' ? 'bg-blue-500 hover:bg-blue-600' : ''}
        >
          <Icon name="CheckCircle2" size={14} className="mr-1" />
          Отправлено
        </Button>
        <Button
          variant={filter === 'failed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('failed')}
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
        <div className="space-y-6">
          {groups.map((group) => {
            const courseInfo = getCourseInfo(group.course);
            const sortedMessages = group.messages.sort((a, b) => 
              new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
            );
            const pendingCount = sortedMessages.filter(m => m.status === 'pending').length;
            
            return (
              <Card key={`${group.phone}_${group.lead_id}`} className="border-2">
                <CardContent className="p-6">
                  <div className="mb-4 pb-4 border-b">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <Badge className={`${courseInfo.color} border-0 font-medium text-base`}>
                        {courseInfo.emoji} {courseInfo.name}
                      </Badge>
                      {pendingCount > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-0">
                          {pendingCount} в очереди
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="User" size={18} className="text-gray-400" />
                      <span className="font-semibold text-lg">{group.lead_name}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-mono text-gray-600">+{group.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {sortedMessages.map((item, idx) => (
                      <div 
                        key={item.id} 
                        className={`p-4 rounded-lg border ${
                          item.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                          item.status === 'sent' ? 'bg-green-50 border-green-200' :
                          item.status === 'failed' ? 'bg-red-50 border-red-200' :
                          'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs font-bold">
                                {idx + 1}
                              </span>
                              <StatusBadge status={item.status} />
                              <span className="font-medium text-sm text-gray-900">{item.message_template}</span>
                            </div>
                            
                            <div className="text-sm text-gray-600 line-clamp-2 ml-8">
                              {item.message_text}
                            </div>

                            <div className="flex flex-wrap gap-4 text-xs text-gray-500 ml-8">
                              <div className="flex items-center gap-1">
                                <Icon name="Calendar" size={12} />
                                <span>Запланировано: {formatDate(item.scheduled_at)}</span>
                              </div>
                              {item.sent_at && (
                                <div className="flex items-center gap-1">
                                  <Icon name="Send" size={12} />
                                  <span>Отправлено: {formatDate(item.sent_at)}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 ml-8 md:ml-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewMessage(item)}
                            >
                              <Icon name="Eye" size={14} />
                            </Button>
                            {item.status === 'pending' && (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => onSendNow(item.id)}
                                  disabled={loading}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Icon name="Send" size={14} />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (confirm('Удалить это сообщение из очереди?')) {
                                      onDelete(item.id);
                                    }
                                  }}
                                  disabled={loading}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}