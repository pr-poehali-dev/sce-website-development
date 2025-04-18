
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/components/auth/AuthContext';
import { UserRole } from '@/lib/types';
import { User, Shield, Key, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!user) {
    return (
      <Layout>
        <div className="sce-container py-12 text-center">
          <p>Вы не авторизованы. <Link to="/login" className="text-sce-primary hover:underline">Войти</Link></p>
        </div>
      </Layout>
    );
  }

  // Get initials from username
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get role color
  const getRoleColor = (role: UserRole) => {
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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would implement the password change functionality
    // For this example, we'll just reset the form
    
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-12">
        <div className="sce-container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <User className="h-8 w-8" /> Личный профиль
          </h1>
          <p className="text-xl">Управление вашей учетной записью в Фонде SCE</p>
        </div>
      </div>

      <div className="sce-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Информация о профиле</CardTitle>
                <CardDescription>Ваши персональные данные</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-sce-primary text-white text-xl">
                    {getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{user.username}</h2>
                <p className="text-sm text-gray-500 mb-3">{user.email}</p>
                <Badge className={`${getRoleColor(user.role as UserRole)}`}>
                  {user.role}
                </Badge>
                
                <div className="w-full mt-6">
                  <p className="text-sm text-gray-500 mb-1">ID сотрудника</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded">{user.id}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                >
                  <Key className="mr-2 h-4 w-4" /> Изменить пароль
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Выйти из аккаунта
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {isChangingPassword ? (
              <Card>
                <CardHeader>
                  <CardTitle>Изменение пароля</CardTitle>
                  <CardDescription>Обновите пароль для вашей учетной записи</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Текущий пароль</Label>
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Новый пароль</Label>
                        <Input 
                          id="newPassword" 
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6 space-x-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setIsChangingPassword(false)}
                      >
                        Отмена
                      </Button>
                      <Button type="submit" className="bg-sce-primary hover:bg-sce-accent">
                        Сохранить пароль
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Уровень доступа</CardTitle>
                  <CardDescription>Информация о вашем уровне доступа в системе Фонда SCE</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Текущая роль</h3>
                        <Badge className={`${getRoleColor(user.role as UserRole)}`}>
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {user.role === UserRole.ADMIN && "Администраторы имеют полный доступ ко всем функциям и данным Фонда SCE."}
                        {user.role === UserRole.RESEARCHER && "Исследователи имеют доступ к созданию и редактированию объектов SCE."}
                        {user.role === UserRole.STAFF && "Персонал имеет доступ к публикации новостей и редактированию некоторого контента."}
                        {user.role === UserRole.READER && "Читатели имеют доступ только к чтению общедоступных материалов Фонда SCE."}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold mb-2">Доступные функции</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          Просмотр объектов SCE
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          Просмотр публикаций и новостей
                        </li>
                        
                        {(user.role === UserRole.ADMIN || user.role === UserRole.RESEARCHER) && (
                          <li className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            Создание и редактирование объектов SCE
                          </li>
                        )}
                        
                        {(user.role === UserRole.ADMIN || user.role === UserRole.STAFF) && (
                          <li className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            Создание и редактирование публикаций
                          </li>
                        )}
                        
                        {user.role === UserRole.ADMIN && (
                          <>
                            <li className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-600" />
                              Управление пользователями
                            </li>
                            <li className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-600" />
                              Доступ к панели администратора
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    {user.role === UserRole.ADMIN && (
                      <>
                        <Separator />
                        <div className="flex justify-end">
                          <Link to="/admin">
                            <Button className="bg-sce-primary hover:bg-sce-accent">
                              <Shield className="mr-2 h-4 w-4" /> Панель администратора
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
