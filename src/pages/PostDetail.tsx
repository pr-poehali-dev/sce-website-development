
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/auth/AuthContext';
import { getPostById } from '@/lib/mock-data';
import { Post, PostCategory } from '@/lib/types';
import { FileText, AlertTriangle, ArrowLeft, Pencil, Clock, User } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Идентификатор публикации не указан');
      setLoading(false);
      return;
    }

    // Load post
    const foundPost = getPostById(id);
    
    if (!foundPost) {
      setError('Публикация не найдена в базе данных');
      setLoading(false);
      return;
    }
    
    setPost(foundPost);
    setLoading(false);
  }, [id]);

  // Helper function to get category badge color
  const getCategoryColor = (category: PostCategory) => {
    switch (category) {
      case PostCategory.NEWS:
        return 'bg-blue-500 hover:bg-blue-600';
      case PostCategory.RESEARCH:
        return 'bg-green-500 hover:bg-green-600';
      case PostCategory.ANNOUNCEMENT:
        return 'bg-purple-500 hover:bg-purple-600';
      case PostCategory.EVENT:
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="sce-container py-12 text-center">
          <p>Загрузка данных...</p>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="sce-container py-12">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Произошла ошибка при загрузке публикации'}
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button onClick={() => navigate('/posts')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Назад к списку публикаций
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-8">
        <div className="sce-container">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge className="bg-white text-sce-primary">
                    Важное
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-sce-primary" onClick={() => navigate('/posts')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Назад
              </Button>
              {isAdmin && (
                <Link to={`/posts/${post.id}/edit`}>
                  <Button className="bg-white text-sce-primary hover:bg-gray-100">
                    <Pencil className="mr-2 h-4 w-4" /> Редактировать
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sce-container py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>Автор: {post.author}</span>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="ml-auto flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="py-1 px-2 text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-6" />
          
          <div className="prose max-w-none">
            <div className="whitespace-pre-line">{post.content}</div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button onClick={() => navigate('/posts')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> К списку публикаций
          </Button>
          {isAdmin && (
            <Link to={`/posts/${post.id}/edit`}>
              <Button className="bg-sce-primary hover:bg-sce-accent">
                <Pencil className="mr-2 h-4 w-4" /> Редактировать
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
