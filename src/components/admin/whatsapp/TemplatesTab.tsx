import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Template } from './types';
import { getCourseInfo } from './utils';

interface TemplatesTabProps {
  templates: Template[];
  onEditTemplate: (template: Template) => void;
}

export default function TemplatesTab({ templates, onEditTemplate }: TemplatesTabProps) {
  return (
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
                  onClick={() => onEditTemplate(template)}
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
  );
}
