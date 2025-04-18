
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PostCard from '@/components/posts/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/auth/AuthContext';
import { getPosts } from '@/lib/mock-data';
import { Post, PostCategory } from '@/lib/types';
import { FileText, Search, Plus, Filter } from 'lucide-react';

const PostsPage = () => {
  const { user, isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  useEffect(() => {
    // Load posts
    const allPosts = getPosts().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setPosts(allPosts);
    setFilteredPosts(allPosts);
  }, []);

  useEffect(() => {
    // Apply filters when search term or category filter changes
    let filtered = posts;
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        post => 
          post.title.toLowerCase().includes(term) || 
          post.content.toLowerCase().includes(term)
      );
    }
    
    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, categoryFilter, posts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
  };

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-12">
        <div className="sce-container">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-8 w-8" /> Новости и публикации
              </h1>
              <p className="text-xl">Официальные материалы Фонда SCE</p>
            </div>
            {isAdmin && (
              <Link to="/posts/create">
                <Button className="bg-white text-sce-primary hover:bg-gray-100">
                  <Plus className="mr-2 h-4 w-4" /> Создать публикацию
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="sce-container py-8">
        {/* Search and filters */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Поиск по заголовку или содержанию..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Все категории" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все категории</SelectItem>
                <SelectItem value={PostCategory.NEWS}>Новости</SelectItem>
                <SelectItem value={PostCategory.RESEARCH}>Исследования</SelectItem>
                <SelectItem value={PostCategory.ANNOUNCEMENT}>Объявления</SelectItem>
                <SelectItem value={PostCategory.EVENT}>События</SelectItem>
                <SelectItem value={PostCategory.OTHER}>Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {(searchTerm || categoryFilter) && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500 flex items-center">
                <Filter className="mr-2 h-4 w-4" /> 
                Найдено публикаций: {filteredPosts.length}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Очистить фильтры
              </Button>
            </div>
          )}
        </div>
        
        {/* Posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Публикации не найдены</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || categoryFilter
                ? 'Нет публикаций, соответствующих заданным критериям поиска.'
                : 'В базе данных пока нет публикаций.'
              }
            </p>
            {isAdmin && (
              <Link to="/posts/create">
                <Button className="bg-sce-primary hover:bg-sce-accent">
                  <Plus className="mr-2 h-4 w-4" /> Создать первую публикацию
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostsPage;
