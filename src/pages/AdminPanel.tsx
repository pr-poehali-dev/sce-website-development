
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  loadData, 
  findUserById, 
  verifyUser,
  updateUserRole,
  getSCEObjects, 
  getPosts,
  deleteSCEObject,
  deletePost
} from '@/lib/mock-data';
import { User, UserRole, SCEObject, Post } from '@/lib/types';
import { 
  Users, 
  Shield, 
  FileText, 
  Settings, 
  Check, 
  X, 
  Pencil, 
  Trash2,
  Plus
} from 'lucide-react';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [objects, setObjects] = useState<SCEObject[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    // Load data
    loadData();
    refreshData();
  }, []);

  const refreshData = () => {
    // Get all users from localStorage
    try {
      const storedUsers = localStorage.getItem('sce_users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      
      // Get SCE objects
      setObjects(getSCEObjects());
      
      // Get posts
      setPosts(getPosts());
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Ошибка загрузки данных",
        description: "Не удалось загрузить данные из базы данных",
        variant: "destructive",
      });
    }
  };

  const handleVerifyUser = (userId: string) => {
    const success = verifyUser(userId);
    
    if (success) {
      refreshData();
      toast({
        title: "Пользователь подтвержден",
        description: "Аккаунт пользователя успешно подтвержден",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось подтвердить аккаунт пользователя",
        variant: "destructive",
      });
    }
  };

  const handleChangeUserRole = (userId: string, role: string) => {
    const success = updateUserRole(userId, role as UserRole);
    
    if (success) {
      refreshData();
      toast({
        title: "Роль изменена",
        description: "Роль пользователя успешно изменена",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить роль пользователя",
        variant: "destructive",
      });
    }
  };

  const handleDeleteObject = (objectId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот объект? Это действие невозможно отменить.')) {
      const success = deleteSCEObject(objectId);
      
      if (success) {
        refreshData();
        toast({
          title: "Объект удален",
          description: "SCE объект успешно удален из базы данных",
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить объект",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту публикацию? Это действие невозможно отменить.')) {
      const success = deletePost(postId);
      
      if (success) {
        refreshData();
        toast({
          title: "Публикация удалена",
          description: "Публикация успешно удалена из базы данных",
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить публикацию",
          variant: "destructive",
        });
      }
    }
  };

  // Role badge color
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-600';
      case UserRole.RESEARCHER:
        return 'bg-purple-600';
      case UserRole.STAFF:
        return 'bg-blue-600';
      case UserRole.READER:
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (!isAdmin) {
    return (
      <Layout>
        <div className="sce-container py-12 min-h-[70vh] flex flex-col items-center justify-center text-center">
          <Shield className="h-16 w-16 text-sce-primary mb-4" />
          <h1 className="text-4xl font-bold mb-4">Доступ запрещен</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
            У вас нет прав доступа к панели администратора.
          </p>
          <p className="text-sce-primary mb-8 font-mono">
            [ТРЕБУЕТСЯ УРОВЕНЬ ДОСТУПА: АДМИНИСТРАТОР]
          </p>
          <Link to="/">
            <Button className="bg-sce-primary hover:bg-sce-accent">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-6">
        <div className="sce-container">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Панель администратора</h1>
          <p>Управление пользователями, объектами и публикациями</p>
        </div>
      </div>

      <div className="sce-container py-8">
        <Tabs defaultValue="users" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Пользователи
            </TabsTrigger>
            <TabsTrigger value="objects" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> SCE Объекты
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Публикации
            </TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>
                  Просмотр и управление зарегистрированными пользователями Фонда SCE
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Имя пользователя</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-xs">{user.id.substring(0, 8)}...</TableCell>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Select 
                              defaultValue={user.role}
                              onValueChange={(value) => handleChangeUserRole(user.id, value)}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue>
                                  <Badge className={`${getRoleBadgeColor(user.role as UserRole)}`}>
                                    {user.role}
                                  </Badge>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={UserRole.ADMIN}>Администратор</SelectItem>
                                <SelectItem value={UserRole.RESEARCHER}>Исследователь</SelectItem>
                                <SelectItem value={UserRole.STAFF}>Персонал</SelectItem>
                                <SelectItem value={UserRole.READER}>Читатель</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {user.verified ? (
                              <Badge className="bg-green-600">Подтвержден</Badge>
                            ) : (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                Не подтвержден
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {!user.verified && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleVerifyUser(user.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Пользователи не найдены
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* SCE Objects Tab */}
          <TabsContent value="objects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Управление объектами SCE</CardTitle>
                  <CardDescription>
                    Создание, редактирование и удаление объектов SCE
                  </CardDescription>
                </div>
                <Link to="/objects/create">
                  <Button className="bg-sce-primary hover:bg-sce-accent">
                    <Plus className="mr-2 h-4 w-4" /> Создать объект
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Номер</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Класс</TableHead>
                      <TableHead>Риск</TableHead>
                      <TableHead>Уровень допуска</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {objects.length > 0 ? (
                      objects.map((object) => (
                        <TableRow key={object.id}>
                          <TableCell className="font-mono font-medium">SCE-{object.number}</TableCell>
                          <TableCell>{object.name}</TableCell>
                          <TableCell>
                            <Badge>{object.containmentClass}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{object.riskClass}</Badge>
                          </TableCell>
                          <TableCell>Уровень {object.clearanceLevel}</TableCell>
                          <TableCell>{new Date(object.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Link to={`/objects/${object.id}/edit`}>
                                <Button size="sm" variant="outline">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteObject(object.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Объекты SCE не найдены
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/objects">Просмотреть все объекты</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Posts Tab */}
          <TabsContent value="posts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Управление публикациями</CardTitle>
                  <CardDescription>
                    Создание, редактирование и удаление публикаций и новостей
                  </CardDescription>
                </div>
                <Link to="/posts/create">
                  <Button className="bg-sce-primary hover:bg-sce-accent">
                    <Plus className="mr-2 h-4 w-4" /> Создать публикацию
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Заголовок</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Автор</TableHead>
                      <TableHead>Важная</TableHead>
                      <TableHead>Дата публикации</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge>{post.category}</Badge>
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>
                            {post.featured ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-gray-400" />
                            )}
                          </TableCell>
                          <TableCell>{new Date(post.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Link to={`/posts/${post.id}/edit`}>
                                <Button size="sm" variant="outline">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Публикации не найдены
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/posts">Просмотреть все публикации</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPanel;
