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

  const totalPending = queue.filter(m => m.status === 'pending').length;
  const totalSent = queue.filter(m => m.status === 'sent').length;
  const totalFailed = queue.filter(m => m.status === 'failed').length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="lg"
          onClick={() => onFilterChange('all')}
          className={`h-auto py-4 flex flex-col items-center gap-2 ${filter === 'all' ? 'bg-gray-900' : ''}`}
        >
          <Icon name="Grid" size={24} />
          <div className="text-sm font-medium">Все</div>
          <div className="text-2xl font-bold">{queue.length}</div>
        </Button>
        
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="lg"
          onClick={() => onFilterChange('pending')}
          className={`h-auto py-4 flex flex-col items-center gap-2 ${filter === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
        >
          <Icon name="Clock" size={24} />
          <div className="text-sm font-medium">В очереди</div>
          <div className="text-2xl font-bold">{totalPending}</div>
        </Button>
        
        <Button
          variant={filter === 'sent' ? 'default' : 'outline'}
          size="lg"
          onClick={() => onFilterChange('sent')}
          className={`h-auto py-4 flex flex-col items-center gap-2 ${filter === 'sent' ? 'bg-green-500 hover:bg-green-600' : ''}`}
        >
          <Icon name="CheckCircle2" size={24} />
          <div className="text-sm font-medium">Отправлено</div>
          <div className="text-2xl font-bold">{totalSent}</div>
        </Button>
        
        <Button
          variant={filter === 'failed' ? 'default' : 'outline'}
          size="lg"
          onClick={() => onFilterChange('failed')}
          className={`h-auto py-4 flex flex-col items-center gap-2 ${filter === 'failed' ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          <Icon name="XCircle" size={24} />
          <div className="text-sm font-medium">Ошибки</div>
          <div className="text-2xl font-bold">{totalFailed}</div>
        </Button>
      </div>

      {queue.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <Icon name="Inbox" size={48} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">Нет сообщений</p>
            <p className="text-gray-400 text-sm mt-1">Сообщения появятся автоматически после заявок</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => {
            const courseInfo = getCourseInfo(group.course);
            const sortedMessages = group.messages.sort((a, b) => 
              new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
            );
            const pendingMessages = sortedMessages.filter(m => m.status === 'pending');
            const nextMessage = pendingMessages[0];
            
            return (
              <Card key={`${group.phone}_${group.lead_id}`} className="border-l-4" style={{borderLeftColor: courseInfo.borderColor}}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{courseInfo.emoji}</span>
                        <div>
                          <div className="font-bold text-lg">{group.lead_name}</div>
                          <div className="text-sm text-gray-500 font-mono">+{group.phone}</div>
                        </div>
                      </div>
                      <Badge className={`${courseInfo.color} border-0`}>
                        {courseInfo.name}
                      </Badge>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold mb-1">
                        {sortedMessages.filter(m => m.status === 'sent').length}/{sortedMessages.length}
                      </div>
                      <div className="text-xs text-gray-500">отправлено</div>
                    </div>
                  </div>

                  {nextMessage && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <Icon name="Clock" size={20} className="text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-yellow-900 mb-1">
                            Следующее сообщение
                          </div>
                          <div className="text-sm text-gray-700 mb-2">
                            {nextMessage.message_text}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Icon name="Calendar" size={12} />
                              <span>{formatDate(nextMessage.scheduled_at)}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {nextMessage.message_template}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onSendNow(nextMessage.id)}
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700 shrink-0"
                        >
                          <Icon name="Send" size={14} className="mr-1" />
                          Отправить сейчас
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-500 mb-2">
                      ВСЕ СООБЩЕНИЯ ({sortedMessages.length}):
                    </div>
                    {sortedMessages.map((item, idx) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          item.status === 'pending' ? 'bg-yellow-50' :
                          item.status === 'sent' ? 'bg-green-50' :
                          item.status === 'failed' ? 'bg-red-50' :
                          'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-gray-200 text-xs font-bold shrink-0">
                          {idx + 1}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <StatusBadge status={item.status} />
                            <span className="font-medium text-sm truncate">{item.message_template}</span>
                          </div>
                          <div className="text-xs text-gray-600 flex items-center gap-3">
                            <span>{formatDate(item.scheduled_at)}</span>
                            {item.sent_at && (
                              <span className="flex items-center gap-1">
                                <Icon name="Check" size={12} className="text-green-600" />
                                {formatDate(item.sent_at)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-1 shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewMessage(item)}
                          >
                            <Icon name="Eye" size={14} />
                          </Button>
                          {item.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (confirm('Удалить?')) onDelete(item.id);
                              }}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          )}
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
