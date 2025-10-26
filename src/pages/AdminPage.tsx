import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { api, Lead, SiteContent, CourseModule, FAQ, Review, GalleryImage, BlogPost } from '@/lib/api';
import ContentManager from '@/components/admin/ContentManager';
import GalleryManager from '@/components/admin/GalleryManager';
import ReviewsManager from '@/components/admin/ReviewsManager';
import BlogManager from '@/components/admin/BlogManager';
import LeadsManager from '@/components/admin/LeadsManager';
import ModulesManager from '@/components/admin/ModulesManager';
import FAQManager from '@/components/admin/FAQManager';

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
  
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [editingModule, setEditingModule] = useState<CourseModule | null>(null);
  const [newModule, setNewModule] = useState({
    course_type: 'acting',
    title: '',
    description: '',
    result: '',
    image_url: ''
  });
  
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: ''
  });

  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [editingGalleryImage, setEditingGalleryImage] = useState<GalleryImage | null>(null);
  const [newGalleryImage, setNewGalleryImage] = useState({
    image_url: '',
    title: '',
    description: ''
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [newReview, setNewReview] = useState({
    author_name: '',
    author_role: '',
    text: '',
    rating: 5
  });

  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    author: ''
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
      const [leadsData, contentData, modulesData, faqData, galleryData, reviewsData, blogData] = await Promise.all([
        api.leads.getAll(authToken),
        api.content.getAll(),
        api.modules.getAll(),
        api.gallery.getFAQ(),
        api.gallery.getImages(),
        api.gallery.getReviews(),
        api.gallery.getBlog()
      ]);
      setLeads(leadsData);
      setContent(contentData);
      setModules(modulesData);
      setFaqs(faqData);
      setGallery(galleryData);
      setReviews(reviewsData);
      setBlog(blogData);
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

  const handleCreateGalleryImage = async () => {
    if (!newGalleryImage.image_url || !newGalleryImage.title) {
      alert('Заполните обязательные поля');
      return;
    }
    try {
      await api.gallery.createImage(newGalleryImage, token);
      await loadData(token);
      setNewGalleryImage({ image_url: '', title: '', description: '' });
      alert('Изображение добавлено');
    } catch (error) {
      alert('Ошибка добавления изображения');
    }
  };

  const handleUpdateGalleryImage = async () => {
    if (!editingGalleryImage) return;
    try {
      await api.gallery.updateImage(editingGalleryImage, token);
      await loadData(token);
      setEditingGalleryImage(null);
      alert('Изображение обновлено');
    } catch (error) {
      alert('Ошибка обновления изображения');
    }
  };

  const handleDeleteGalleryImage = async (id: number) => {
    if (!confirm('Удалить изображение?')) return;
    try {
      await api.gallery.deleteImage(id, token);
      await loadData(token);
      alert('Изображение удалено');
    } catch (error) {
      alert('Ошибка удаления изображения');
    }
  };

  const handleCreateReview = async () => {
    if (!newReview.author_name || !newReview.text) {
      alert('Заполните обязательные поля');
      return;
    }
    try {
      await api.gallery.createReview(newReview, token);
      await loadData(token);
      setNewReview({ author_name: '', author_role: '', text: '', rating: 5 });
      alert('Отзыв добавлен');
    } catch (error) {
      alert('Ошибка добавления отзыва');
    }
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;
    try {
      await api.gallery.updateReview(editingReview, token);
      await loadData(token);
      setEditingReview(null);
      alert('Отзыв обновлен');
    } catch (error) {
      alert('Ошибка обновления отзыва');
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm('Удалить отзыв?')) return;
    try {
      await api.gallery.deleteReview(id, token);
      await loadData(token);
      alert('Отзыв удален');
    } catch (error) {
      alert('Ошибка удаления отзыва');
    }
  };

  const handleCreateBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.content) {
      alert('Заполните обязательные поля');
      return;
    }
    try {
      await api.gallery.createBlog(newBlogPost, token);
      await loadData(token);
      setNewBlogPost({ title: '', excerpt: '', content: '', image_url: '', author: '' });
      alert('Статья добавлена');
    } catch (error) {
      alert('Ошибка добавления статьи');
    }
  };

  const handleUpdateBlogPost = async () => {
    if (!editingBlogPost) return;
    try {
      await api.gallery.updateBlog(editingBlogPost, token);
      await loadData(token);
      setEditingBlogPost(null);
      alert('Статья обновлена');
    } catch (error) {
      alert('Ошибка обновления статьи');
    }
  };

  const handleDeleteBlogPost = async (id: number) => {
    if (!confirm('Удалить статью?')) return;
    try {
      await api.gallery.deleteBlog(id, token);
      await loadData(token);
      alert('Статья удалена');
    } catch (error) {
      alert('Ошибка удаления статьи');
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

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid">
            <TabsTrigger value="leads">Лиды</TabsTrigger>
            <TabsTrigger value="content">Контент</TabsTrigger>
            <TabsTrigger value="modules">Модули</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <LeadsManager 
              leads={leads}
              onUpdateStatus={handleUpdateLeadStatus}
            />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager
              content={content}
              editingKey={editingKey}
              editingValue={editingValue}
              onStartEditing={startEditingContent}
              onEditingKeyChange={setEditingKey}
              onEditingValueChange={setEditingValue}
              onUpdate={handleUpdateContent}
            />
          </TabsContent>

          <TabsContent value="modules">
            <ModulesManager
              modules={modules}
              newModule={newModule}
              editingModule={editingModule}
              onNewModuleChange={(field, value) => setNewModule({ ...newModule, [field]: value })}
              onEditingModuleChange={(field, value) => editingModule && setEditingModule({ ...editingModule, [field]: value })}
              onCreate={handleCreateModule}
              onUpdate={handleUpdateModule}
              onDelete={handleDeleteModule}
              onStartEditing={setEditingModule}
              onCancelEditing={() => setEditingModule(null)}
            />
          </TabsContent>

          <TabsContent value="faq">
            <FAQManager
              faqs={faqs}
              newFAQ={newFAQ}
              editingFAQ={editingFAQ}
              onNewFAQChange={(field, value) => setNewFAQ({ ...newFAQ, [field]: value })}
              onEditingFAQChange={(field, value) => editingFAQ && setEditingFAQ({ ...editingFAQ, [field]: value })}
              onCreate={handleCreateFAQ}
              onUpdate={handleUpdateFAQ}
              onDelete={handleDeleteFAQ}
              onStartEditing={setEditingFAQ}
              onCancelEditing={() => setEditingFAQ(null)}
            />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager
              gallery={gallery}
              newGalleryImage={newGalleryImage}
              editingGalleryImage={editingGalleryImage}
              onNewImageChange={(field, value) => setNewGalleryImage({ ...newGalleryImage, [field]: value })}
              onEditingImageChange={(field, value) => editingGalleryImage && setEditingGalleryImage({ ...editingGalleryImage, [field]: value })}
              onCreate={handleCreateGalleryImage}
              onUpdate={handleUpdateGalleryImage}
              onDelete={handleDeleteGalleryImage}
              onStartEditing={setEditingGalleryImage}
              onCancelEditing={() => setEditingGalleryImage(null)}
            />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsManager
              reviews={reviews}
              newReview={newReview}
              editingReview={editingReview}
              onNewReviewChange={(field, value) => setNewReview({ ...newReview, [field]: value })}
              onEditingReviewChange={(field, value) => editingReview && setEditingReview({ ...editingReview, [field]: value })}
              onCreate={handleCreateReview}
              onUpdate={handleUpdateReview}
              onDelete={handleDeleteReview}
              onStartEditing={setEditingReview}
              onCancelEditing={() => setEditingReview(null)}
            />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager
              blog={blog}
              newBlogPost={newBlogPost}
              editingBlogPost={editingBlogPost}
              onNewPostChange={(field, value) => setNewBlogPost({ ...newBlogPost, [field]: value })}
              onEditingPostChange={(field, value) => editingBlogPost && setEditingBlogPost({ ...editingBlogPost, [field]: value })}
              onCreate={handleCreateBlogPost}
              onUpdate={handleUpdateBlogPost}
              onDelete={handleDeleteBlogPost}
              onStartEditing={setEditingBlogPost}
              onCancelEditing={() => setEditingBlogPost(null)}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
