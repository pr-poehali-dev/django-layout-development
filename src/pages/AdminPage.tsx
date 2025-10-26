import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';
import { api, Lead, SiteContent, CourseModule, FAQ } from '@/lib/api';
import { Textarea } from '@/components/ui/textarea';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [content, setContent] = useState<SiteContent[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [editingValue, setEditingValue] = useState('');
  
  // Modules state
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [editingModule, setEditingModule] = useState<CourseModule | null>(null);
  const [newModule, setNewModule] = useState({
    course_type: 'acting',
    title: '',
    description: '',
    result: '',
    image_url: ''
  });
  
  // FAQ state
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: ''
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      loadData(savedToken);
    }
  }, []);

  const loadData = async (authToken: string) => {
    try {
      const [leadsData, contentData, modulesData, faqData] = await Promise.all([
        api.leads.getAll(authToken),
        api.content.getAll(),
        api.modules.getAll(),
        api.gallery.getFAQ()
      ]);
      setLeads(leadsData);
      setContent(contentData);
      setModules(modulesData);
      setFaqs(faqData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.auth.login(username, password);
      if (response.success) {
        setToken(response.token);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', response.token);
        await loadData(response.token);
      } else {
        alert('Неверные учетные данные');
      }
    } catch (error) {
      alert('Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
    localStorage.removeItem('admin_token');
  };

  const handleUpdateLeadStatus = async (leadId: number, status: string) => {
    try {
      await api.leads.updateStatus(leadId, status, token);
      await loadData(token);
    } catch (error) {
      alert('Ошибка обновления статуса');
    }
  };

  const handleUpdateContent = async () => {
    if (!editingKey || !editingValue) return;

    try {
      await api.content.update(editingKey, editingValue, token);
      await loadData(token);
      setEditingKey('');
      setEditingValue('');
      alert('Контент обновлен');
    } catch (error) {
      alert('Ошибка обновления контента');
    }
  };

  const startEditingContent = (item: SiteContent) => {
    setEditingKey(item.key);
    setEditingValue(item.value);
  };

  // Module handlers
  const handleCreateModule = async () => {
    if (!newModule.title || !newModule.description) {
      alert('Заполните обязательные поля');
      return;
    }
    try {
      await api.modules.create(newModule, token);
      await loadData(token);
      setNewModule({
        course_type: 'acting',
        title: '',
        description: '',
        result: '',
        image_url: ''
      });
      alert('Модуль создан');
    } catch (error) {
      alert('Ошибка создания модуля');
    }
  };

  const handleUpdateModule = async () => {
    if (!editingModule) return;
    try {
      await api.modules.update(editingModule, token);
      await loadData(token);
      setEditingModule(null);
      alert('Модуль обновлен');
    } catch (error) {
      alert('Ошибка обновления модуля');
    }
  };

  const handleDeleteModule = async (id: number) => {
    if (!confirm('Удалить модуль?')) return;
    try {
      await api.modules.delete(id, token);
      await loadData(token);
      alert('Модуль удален');
    } catch (error) {
      alert('Ошибка удаления модуля');
    }
  };

  // FAQ handlers
  const handleCreateFAQ = async () => {
    if (!newFAQ.question || !newFAQ.answer) {
      alert('Заполните все поля');
      return;
    }
    try {
      await api.gallery.createFAQ(newFAQ, token);
      await loadData(token);
      setNewFAQ({ question: '', answer: '' });
      alert('FAQ создан');
    } catch (error) {
      alert('Ошибка создания FAQ');
    }
  };

  const handleUpdateFAQ = async () => {
    if (!editingFAQ) return;
    try {
      await api.gallery.updateFAQ(editingFAQ, token);
      await loadData(token);
      setEditingFAQ(null);
      alert('FAQ обновлен');
    } catch (error) {
      alert('Ошибка обновления FAQ');
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (!confirm('Удалить FAQ?')) return;
    try {
      await api.gallery.deleteFAQ(id, token);
      await loadData(token);
      alert('FAQ удален');
    } catch (error) {
      alert('Ошибка удаления FAQ');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Icon name="Lock" size={48} className="mx-auto mb-4 text-primary" />
            <CardTitle className="text-2xl">Вход в админку</CardTitle>
            <CardDescription>Введите учетные данные для доступа</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Shield" className="text-primary" size={24} />
            <div className="text-xl font-bold">Админка</div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <a href="/">Вернуться на сайт</a>
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="leads">
              <Icon name="Users" size={18} className="mr-2" />
              Заявки ({leads.length})
            </TabsTrigger>
            <TabsTrigger value="content">
              <Icon name="FileText" size={18} className="mr-2" />
              Контент
            </TabsTrigger>
            <TabsTrigger value="modules">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Модули курса
            </TabsTrigger>
            <TabsTrigger value="faq">
              <Icon name="HelpCircle" size={18} className="mr-2" />
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Управление заявками</CardTitle>
                <CardDescription>Просмотр и обработка заявок с сайта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="Inbox" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Заявок пока нет</p>
                    </div>
                  ) : (
                    leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg gap-4"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-lg mb-1">{lead.phone}</div>
                          <div className="text-sm text-muted-foreground">
                            Источник: {lead.source} • {new Date(lead.created_at).toLocaleString('ru-RU')}
                          </div>
                        </div>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleUpdateLeadStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Новая</SelectItem>
                            <SelectItem value="trial">Записался на пробное</SelectItem>
                            <SelectItem value="enrolled">Записался на обучение</SelectItem>
                            <SelectItem value="thinking">Думает</SelectItem>
                            <SelectItem value="not_target">Нецелевой</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Редактирование контента</CardTitle>
                  <CardDescription>Обновите значения для управления содержимым сайта</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="content-key">Ключ</Label>
                      <Select value={editingKey} onValueChange={(value) => {
                        setEditingKey(value);
                        const item = content.find(c => c.key === value);
                        if (item) setEditingValue(item.value);
                      }}>
                        <SelectTrigger id="content-key">
                          <SelectValue placeholder="Выберите ключ для редактирования" />
                        </SelectTrigger>
                        <SelectContent>
                          {content.map((item) => (
                            <SelectItem key={item.id} value={item.key}>
                              {item.key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {editingKey && (
                      <>
                        <div>
                          <Label htmlFor="content-value">Значение</Label>
                          <Input
                            id="content-value"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            placeholder="Введите новое значение"
                          />
                        </div>
                        <Button onClick={handleUpdateContent} className="w-full">
                          <Icon name="Save" size={18} className="mr-2" />
                          Сохранить
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Текущий контент</CardTitle>
                  <CardDescription>Актуальные значения на сайте</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {content.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 border border-border rounded-lg hover:bg-muted/50 transition cursor-pointer"
                        onClick={() => startEditingContent(item)}
                      >
                        <div className="font-semibold text-sm text-primary mb-1">{item.key}</div>
                        <div className="text-sm text-muted-foreground truncate">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Основные настройки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Видео на главной (URL)</Label>
                      <div className="text-sm text-muted-foreground">hero_video_url</div>
                    </div>
                    <div>
                      <Label>Финальное видео (URL)</Label>
                      <div className="text-sm text-muted-foreground">final_video_url</div>
                    </div>
                    <div>
                      <Label>Дата пробного занятия</Label>
                      <div className="text-sm text-muted-foreground">trial_date</div>
                    </div>
                    <div>
                      <Label>Дата начала курса</Label>
                      <div className="text-sm text-muted-foreground">course_start_date</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Создать модуль</CardTitle>
                  <CardDescription>Добавьте новый модуль курса</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="module-course">Курс</Label>
                      <Select
                        value={newModule.course_type}
                        onValueChange={(value) => setNewModule({ ...newModule, course_type: value })}
                      >
                        <SelectTrigger id="module-course">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acting">Актерское мастерство</SelectItem>
                          <SelectItem value="oratory">Ораторское искусство</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="module-title">Название</Label>
                      <Input
                        id="module-title"
                        value={newModule.title}
                        onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                        placeholder="Введите название модуля"
                      />
                    </div>
                    <div>
                      <Label htmlFor="module-description">Описание</Label>
                      <Input
                        id="module-description"
                        value={newModule.description}
                        onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                        placeholder="Описание модуля"
                      />
                    </div>
                    <div>
                      <Label htmlFor="module-topics">Темы (через запятую)</Label>
                      <Textarea
                        id="module-topics"
                        value={newModule.result}
                        onChange={(e) => setNewModule({ ...newModule, result: e.target.value })}
                        placeholder="Тема 1, Тема 2, Тема 3"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="module-image">URL изображения</Label>
                      <Input
                        id="module-image"
                        value={newModule.image_url}
                        onChange={(e) => setNewModule({ ...newModule, image_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <Button onClick={handleCreateModule} className="w-full">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Создать модуль
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Список модулей</CardTitle>
                  <CardDescription>Все модули курса</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {modules.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Модулей пока нет</p>
                      </div>
                    ) : (
                      modules.map((module) => (
                        <div
                          key={module.id}
                          className="p-4 border border-border rounded-lg space-y-2"
                        >
                          {editingModule?.id === module.id ? (
                            <div className="space-y-3">
                              <Select
                                value={editingModule.course_type}
                                onValueChange={(value) => setEditingModule({ ...editingModule, course_type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="acting">Актерское мастерство</SelectItem>
                                  <SelectItem value="oratory">Ораторское искусство</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                value={editingModule.title}
                                onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                                placeholder="Название"
                              />
                              <Input
                                value={editingModule.description}
                                onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                                placeholder="Описание"
                              />
                              <Textarea
                                value={editingModule.result}
                                onChange={(e) => setEditingModule({ ...editingModule, result: e.target.value })}
                                placeholder="Темы"
                                rows={3}
                              />
                              <Input
                                value={editingModule.image_url || ''}
                                onChange={(e) => setEditingModule({ ...editingModule, image_url: e.target.value })}
                                placeholder="URL изображения"
                              />
                              <div className="flex gap-2">
                                <Button onClick={handleUpdateModule} className="flex-1">
                                  <Icon name="Save" size={18} className="mr-2" />
                                  Сохранить
                                </Button>
                                <Button onClick={() => setEditingModule(null)} variant="outline" className="flex-1">
                                  Отмена
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="font-semibold text-lg">{module.title}</div>
                                  <div className="text-sm text-muted-foreground mb-2">
                                    {module.course_type === 'acting' ? 'Актерское мастерство' : 'Ораторское искусство'}
                                  </div>
                                  <div className="text-sm mb-2">{module.description}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Темы: {module.result}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 pt-2">
                                <Button
                                  onClick={() => setEditingModule(module)}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                >
                                  <Icon name="Edit" size={16} className="mr-2" />
                                  Редактировать
                                </Button>
                                <Button
                                  onClick={() => handleDeleteModule(module.id)}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                >
                                  <Icon name="Trash2" size={16} className="mr-2" />
                                  Удалить
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Создать FAQ</CardTitle>
                  <CardDescription>Добавьте новый вопрос и ответ</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="faq-question">Вопрос</Label>
                      <Input
                        id="faq-question"
                        value={newFAQ.question}
                        onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                        placeholder="Введите вопрос"
                      />
                    </div>
                    <div>
                      <Label htmlFor="faq-answer">Ответ</Label>
                      <Textarea
                        id="faq-answer"
                        value={newFAQ.answer}
                        onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                        placeholder="Введите ответ"
                        rows={5}
                      />
                    </div>
                    <Button onClick={handleCreateFAQ} className="w-full">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Создать FAQ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Список FAQ</CardTitle>
                  <CardDescription>Все вопросы и ответы</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {faqs.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="HelpCircle" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>FAQ пока нет</p>
                      </div>
                    ) : (
                      faqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="p-4 border border-border rounded-lg space-y-2"
                        >
                          {editingFAQ?.id === faq.id ? (
                            <div className="space-y-3">
                              <Input
                                value={editingFAQ.question}
                                onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                                placeholder="Вопрос"
                              />
                              <Textarea
                                value={editingFAQ.answer}
                                onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                                placeholder="Ответ"
                                rows={5}
                              />
                              <div className="flex gap-2">
                                <Button onClick={handleUpdateFAQ} className="flex-1">
                                  <Icon name="Save" size={18} className="mr-2" />
                                  Сохранить
                                </Button>
                                <Button onClick={() => setEditingFAQ(null)} variant="outline" className="flex-1">
                                  Отмена
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="font-semibold text-lg">{faq.question}</div>
                              <div className="text-sm text-muted-foreground">{faq.answer}</div>
                              <div className="flex gap-2 pt-2">
                                <Button
                                  onClick={() => setEditingFAQ(faq)}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                >
                                  <Icon name="Edit" size={16} className="mr-2" />
                                  Редактировать
                                </Button>
                                <Button
                                  onClick={() => handleDeleteFAQ(faq.id)}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                >
                                  <Icon name="Trash2" size={16} className="mr-2" />
                                  Удалить
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}