import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { api, BlogPost } from '@/lib/api';
import { formatDate } from '@/lib/dates';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await api.gallery.getBlog();
      setPosts(data);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Блог <span className="text-primary">школы</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полезные материалы, новости и истории успеха наших учеников
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <Icon name="Loader2" className="animate-spin mx-auto text-primary" size={48} />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="FileText" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <p className="text-xl text-muted-foreground">
                Пока статей нет. Скоро здесь появятся интересные материалы!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {post.cover_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.cover_image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <Icon name="User" size={14} />
                          {post.author}
                        </span>
                      )}
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {formatDate(post.published_at)}
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt || post.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
