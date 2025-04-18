
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, X, ChevronDown, Shield, FileText, Home, User, LogOut } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Get initials from username
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sce-header shadow-md">
      <div className="sce-container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="sce-logo text-2xl md:text-3xl font-bold">
              SCE Фонд
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">Главная</Link>
            <Link to="/objects" className="text-white hover:text-gray-200">SCE Объекты</Link>
            <Link to="/posts" className="text-white hover:text-gray-200">Новости</Link>
            <Link to="/about" className="text-white hover:text-gray-200">О нас</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-gray-200 flex items-center gap-1 px-2">
                  Ещё <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link to="/reports" className="w-full">Отчеты</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/personnel" className="w-full">Персонал</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/facilities" className="w-full">Объекты</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/privacy" className="w-full">Политика конфиденциальности</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu or login/register buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-2 h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-white/20">
                      <AvatarFallback className="bg-sce-accent text-white">
                        {getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 w-full">
                      <User size={16} /> Профиль
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 w-full">
                        <Shield size={16} /> Панель администратора
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut size={16} /> Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-sce-primary">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-white text-sce-primary hover:bg-gray-100">
                    Регистрация
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Меню"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-gray-200 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} /> Главная
              </Link>
              <Link 
                to="/objects" 
                className="text-white hover:text-gray-200 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield size={18} /> SCE Объекты
              </Link>
              <Link 
                to="/posts" 
                className="text-white hover:text-gray-200 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText size={18} /> Новости
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-gray-200 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} /> О нас
              </Link>
              
              <hr className="border-white/20" />
              
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border-2 border-white/20">
                      <AvatarFallback className="bg-sce-accent text-white">
                        {getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">{user.username}</div>
                      <div className="text-xs text-white/70">{user.email}</div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="text-white hover:text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Профиль
                  </Link>
                  
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-white hover:text-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Панель администратора
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-200 text-left flex items-center gap-2"
                  >
                    <LogOut size={18} /> Выйти
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-sce-primary">
                      Войти
                    </Button>
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-white text-sce-primary hover:bg-gray-100">
                      Регистрация
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
