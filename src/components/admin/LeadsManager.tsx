import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Lead } from '@/lib/api';
import { formatDate } from '@/lib/dates';

interface LeadsManagerProps {
  leads: Lead[];
  onUpdateStatus: (leadId: number, status: string) => void;
}

export default function LeadsManager({ leads, onUpdateStatus }: LeadsManagerProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-500/10 text-blue-500',
      contacted: 'bg-yellow-500/10 text-yellow-500',
      converted: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500'
    };
    return styles[status as keyof typeof styles] || styles.new;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      new: 'Новый',
      contacted: 'Связались',
      converted: 'Конверсия',
      rejected: 'Отклонен'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Лиды ({leads.length})</span>
            <div className="flex gap-2 text-sm font-normal">
              <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">
                Новых: {leads.filter(l => l.status === 'new').length}
              </span>
              <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                Конверсий: {leads.filter(l => l.status === 'converted').length}
              </span>
            </div>
          </CardTitle>
          <CardDescription>Управление заявками с сайта</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Inbox" size={48} className="mx-auto mb-2 opacity-50" />
                <p>Заявок пока нет</p>
              </div>
            ) : (
              leads.map((lead) => (
                <Card key={lead.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="User" size={16} className="text-primary" />
                          <span className="font-semibold">{lead.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Icon name="Phone" size={14} />
                          <a href={`tel:${lead.phone}`} className="hover:text-primary">
                            {lead.phone}
                          </a>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Icon name="Mail" size={14} />
                            <a href={`mailto:${lead.email}`} className="hover:text-primary">
                              {lead.email}
                            </a>
                          </div>
                        )}
                        {lead.message && (
                          <div className="mt-2 text-sm bg-accent/50 p-2 rounded">
                            {lead.message}
                          </div>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(lead.status)}`}>
                        {getStatusLabel(lead.status)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="text-xs text-muted-foreground">
                        <div>Источник: {lead.source}</div>
                        <div>Дата: {formatDate(lead.created_at)}</div>
                      </div>
                      <Select
                        value={lead.status}
                        onValueChange={(value) => onUpdateStatus(lead.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Новый</SelectItem>
                          <SelectItem value="contacted">Связались</SelectItem>
                          <SelectItem value="converted">Конверсия</SelectItem>
                          <SelectItem value="rejected">Отклонен</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
