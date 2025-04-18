
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { User, UserRole } from '@/lib/types';
import { findUserByEmail, loadData, updateUserRole } from '@/lib/mock-data';
import { Search, UserCheck, UserX } from 'lucide-react';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Load users from localStorage
    loadData();
    const storedUsers = localStorage.getItem('sce_users');
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
    }
  }, []);
  
  const handleRoleChange = (userId: string, newRole: UserRole) => {
    if (!currentUser?.role || currentUser.role !== UserRole.ADMIN) {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав для изменения ролей пользователей",
        variant: "destructive",
      });
      return;
    }

    // Update user role
    const success = updateUserRole(userId, newRole);
    
    if (success) {
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      toast({
        title: "Роль обновлена",
        description: "Роль пользователя успешно обновлена",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роль пользователя",
        variant: "destructive",
      });
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm) {
      // Reset to all users
      loadData();
      const storedUsers = localStorage.getItem('sce_users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      return;
    }
    
    // Search for user by email
    const foundUser = findUserByEmail(searchTerm);
    if (foundUser) {
      setUsers([foundUser]);
    } else {
      setUsers([]);
      toast({
        title: "Пользователь не найден",
        description: "Пользователь с указанным email не найден",
        variant: "destructive",
      });
    }
  };
  
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-500';
      case UserRole.RESEARCHER:
        return 'bg-blue-500';
      case UserRole.STAFF:
        return 'bg-green-500';
      case UserRole.READER:
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Администратор';
      case UserRole.RESEARCHER:
        return 'Исследователь';
      case UserRole.STAFF:
        return 'Персонал';
      case UserRole.READER:
        return 'Читатель';
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Управление пользователями</h2>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Поиск по email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button type="submit" variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Поиск
        </Button>
      </form>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Имя пользователя</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата регистрации</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.verified ? (
                      <div className="flex items-center text-green-600">
                        <UserCheck className="mr-1 h-4 w-4" />
                        Подтвержден
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-600">
                        <UserX className="mr-1 h-4 w-4" />
                        Не подтвержден
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                      disabled={currentUser?.id === user.id || !currentUser || currentUser.role !== UserRole.ADMIN}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Изменить роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Администратор</SelectItem>
                        <SelectItem value={UserRole.RESEARCHER}>Исследователь</SelectItem>
                        <SelectItem value={UserRole.STAFF}>Персонал</SelectItem>
                        <SelectItem value={UserRole.READER}>Читатель</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Пользователи не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
