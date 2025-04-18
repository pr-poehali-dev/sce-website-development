
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PostForm from '@/components/posts/PostForm';
import { useAuth } from '@/components/auth/AuthContext';
import { UserRole } from '@/lib/types';
import { FileText } from 'lucide-react';

const PostCreate = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Check if user has permission to create posts
  const canCreatePosts = user && (isAdmin || user.role === UserRole.STAFF);
  
  // Handle successful post creation
  const handleSuccess = () => {
    navigate('/posts');
  };
  
  if (!canCreatePosts) {
    return (
      <Layout>
        <div className="sce-container py-12 min-h-[70vh] flex flex-col items-center justify-center text-center">
          <FileText className="h-16 w-16 text-sce-primary mb-4" />
          <h1 className="text-4xl font-bold mb-4">Доступ запрещен</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
            У вас нет прав для создания новых публикаций.
          </p>
          <p className="text-sce-primary mb-8 font-mono">
            [ТРЕБУЕТСЯ УРОВЕНЬ ДОСТУПА: АДМИНИСТРАТОР ИЛИ ПЕРСОНАЛ]
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-8">
        <div className="sce-container">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Создание новой публикации</h1>
          <p>Создайте новую публикацию для информационной базы Фонда SCE</p>
        </div>
      </div>

      <div className="sce-container py-8">
        <PostForm onSuccess={handleSuccess} />
      </div>
    </Layout>
  );
};

export default PostCreate;
