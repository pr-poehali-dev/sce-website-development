
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { createPost } from '@/lib/mock-data';
import { PostCategory } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface PostFormProps {
  onSuccess?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: PostCategory.NEWS,
    tags: '',
    featured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!user) {
        toast({
          title: "Ошибка",
          description: "Вы должны быть авторизованы для создания постов",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.title || !formData.content) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, заполните все обязательные поля",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Process tags
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim())
        : [];
      
      // Create new post
      const newPost = createPost({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: tagsArray,
        featured: formData.featured,
        author: user.username,
      });
      
      toast({
        title: "Пост создан",
        description: "Публикация успешно создана и добавлена в базу данных",
      });
      
      // Reset form or redirect
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(`/posts/${newPost.id}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать публикацию. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Создание новой публикации</CardTitle>
        <CardDescription>
          Заполните все необходимые поля для создания новой публикации в информационной базе Фонда SCE.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              name="title"
              placeholder="Введите заголовок"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Содержание</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Введите текст публикации..."
              value={formData.content}
              onChange={handleChange}
              className="min-h-[200px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={handleSelectChange('category')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PostCategory.NEWS}>Новости</SelectItem>
                  <SelectItem value={PostCategory.RESEARCH}>Исследования</SelectItem>
                  <SelectItem value={PostCategory.ANNOUNCEMENT}>Объявления</Select
Item>
                  <SelectItem value={PostCategory.EVENT}>События</SelectItem>
                  <SelectItem value={PostCategory.OTHER}>Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Теги (через запятую)</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="новости, исследования, ..."
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="featured">Отметить как важное</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/posts')}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button 
          type="submit" 
          className="bg-sce-primary hover:bg-sce-accent"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Создание...
            </>
          ) : (
            'Опубликовать'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostForm;
