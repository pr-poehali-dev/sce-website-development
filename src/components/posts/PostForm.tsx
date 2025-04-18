
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/components/auth/AuthContext';
import { createPost, updatePost, getPostById } from '@/lib/mock-data';
import { Post, PostCategory } from '@/lib/types';
import { v4 as uuidv4 } from '@/lib/utils';
import { FileText, X, Plus } from 'lucide-react';

// Validation schema
const postSchema = z.object({
  title: z.string().min(3, { message: 'Заголовок должен содержать минимум 3 символа' }).max(100),
  content: z.string().min(10, { message: 'Содержание должно содержать минимум 10 символов' }),
  category: z.string().min(1, { message: 'Выберите категорию' }),
  featured: z.boolean().optional(),
  author: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  postId?: string;
  onSuccess: () => void;
}

const PostForm = ({ postId, onSuccess }: PostFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialPost, setInitialPost] = useState<Post | null>(null);
  
  // Form setup
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      category: PostCategory.NEWS,
      featured: false,
      author: user ? user.username : '',
    },
  });
  
  useEffect(() => {
    // If postId is provided, load existing post data
    if (postId) {
      const post = getPostById(postId);
      if (post) {
        setInitialPost(post);
        
        // Set form values
        form.reset({
          title: post.title,
          content: post.content,
          category: post.category,
          featured: post.featured,
          author: post.author,
        });
        
        // Set tags
        if (post.tags) {
          setTags(post.tags);
        }
      } else {
        toast({
          title: "Ошибка",
          description: "Публикация не найдена",
          variant: "destructive",
        });
        navigate('/posts');
      }
    }
  }, [postId, form, navigate, toast]);
  
  const onSubmit = async (values: PostFormValues) => {
    setLoading(true);
    
    try {
      const postData: Post = {
        id: initialPost?.id || uuidv4(),
        title: values.title,
        content: values.content,
        category: values.category as PostCategory,
        featured: values.featured || false,
        author: values.author || user?.username || 'Анонимный автор',
        createdAt: initialPost?.createdAt || new Date(),
        updatedAt: initialPost ? new Date() : null,
        tags: tags.length > 0 ? tags : undefined,
        createdBy: initialPost?.createdBy || user?.id || '',
      };
      
      if (initialPost) {
        // Update existing post
        updatePost(postData);
        toast({
          title: "Успешно",
          description: "Публикация успешно обновлена",
        });
      } else {
        // Create new post
        createPost(postData);
        toast({
          title: "Успешно",
          description: "Новая публикация создана",
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить публикацию",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-sce-primary" />
          {initialPost ? 'Редактирование публикации' : 'Создание новой публикации'}
        </CardTitle>
        <CardDescription>
          {initialPost 
            ? 'Измените информацию о существующей публикации' 
            : 'Заполните форму для создания новой публикации'
          }
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              placeholder="Введите заголовок публикации"
              {...form.register('title')}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select
                defaultValue={form.getValues('category')}
                onValueChange={(value) => form.setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PostCategory.NEWS}>Новости</SelectItem>
                  <SelectItem value={PostCategory.RESEARCH}>Исследования</SelectItem>
                  <SelectItem value={PostCategory.ANNOUNCEMENT}>Объявления</SelectItem>
                  <SelectItem value={PostCategory.EVENT}>События</SelectItem>
                  <SelectItem value={PostCategory.OTHER}>Другое</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Автор</Label>
              <Input
                id="author"
                placeholder="Имя автора"
                defaultValue={user?.username || ''}
                {...form.register('author')}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Содержание</Label>
            <Textarea
              id="content"
              placeholder="Введите содержание публикации"
              className="min-h-[200px]"
              {...form.register('content')}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label>Теги</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Добавить тег"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md flex items-center text-sm"
                  >
                    #{tag}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0 ml-1 text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={form.getValues('featured')}
              onCheckedChange={(checked) => form.setValue('featured', checked as boolean)}
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Отметить как важную публикацию
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate('/posts')}>
            Отмена
          </Button>
          <Button type="submit" disabled={loading} className="bg-sce-primary hover:bg-sce-accent">
            {loading ? 'Сохранение...' : initialPost ? 'Сохранить изменения' : 'Создать публикацию'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PostForm;
