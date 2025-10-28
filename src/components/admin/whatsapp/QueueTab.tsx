import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { QueueItem } from './types';
import { getStatusBadge, formatDate, getCourseInfo } from './utils';

interface QueueTabProps {
  queue: QueueItem[];
  filter: string;
  loading: boolean;
  onFilterChange: (filter: string) => void;
  onSendNow: (id: number) => void;
  onViewMessage: (item: QueueItem) => void;
}

export default function QueueTab({ 
  queue, 
  filter, 
  loading, 
  onFilterChange, 
  onSendNow, 
  onViewMessage 
}: QueueTabProps) {
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
                        onClick={() => onViewMessage(item)}
                        className="flex-1 md:flex-none"
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        Просмотр
                      </Button>
                      {item.status === 'pending' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onSendNow(item.id)}
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
    </div>
  );
}
