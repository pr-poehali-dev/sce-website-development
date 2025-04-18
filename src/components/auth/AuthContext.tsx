
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { 
  findUserByEmail, 
  getCurrentUser, 
  setCurrentUser, 
  createUser,
  verifyUser,
  initializeMockData
} from '@/lib/mock-data';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  verifyAccount: (id: string) => Promise<boolean>;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  verifyAccount: async () => false,
  isAdmin: false,
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize mock data on first load
    initializeMockData();
    
    // Check if user is already logged in
    const loadUser = async () => {
      try {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would validate against a backend
    // Here we just check against localStorage
    try {
      const foundUser = findUserByEmail(email);
      
      if (!foundUser) {
        toast({
          title: "Ошибка входа",
          description: "Пользователь с таким email не найден.",
          variant: "destructive",
        });
        return false;
      }

      // In a real app, you would hash passwords
      const savedPassword = localStorage.getItem(`sce_user_${foundUser.id}`);
      
      if (savedPassword !== password) {
        toast({
          title: "Ошибка входа",
          description: "Неверный пароль.",
          variant: "destructive",
        });
        return false;
      }

      if (!foundUser.verified) {
        toast({
          title: "Аккаунт не подтвержден",
          description: "Пожалуйста, подтвердите вашу электронную почту.",
          variant: "destructive",
        });
        return false;
      }

      // Set current user
      setUser(foundUser);
      setCurrentUser(foundUser.id);
      
      toast({
        title: "Успешный вход",
        description: `Добро пожаловать, ${foundUser.username}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Ошибка входа",
        description: "Произошла ошибка при попытке входа.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы.",
    });
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUser = findUserByEmail(email);
      
      if (existingUser) {
        toast({
          title: "Ошибка регистрации",
          description: "Пользователь с таким email уже существует.",
          variant: "destructive",
        });
        return false;
      }

      // Create new user
      const newUser = createUser({
        email,
        username,
        role: UserRole.READER, // Default role for new users
        verified: false, // Needs email verification
      });

      // Store password (in a real app, this would be hashed)
      localStorage.setItem(`sce_user_${newUser.id}`, password);

      // In a real app, you would send verification email here
      // For mock purposes, we'll just simulate email verification
      toast({
        title: "Регистрация успешна",
        description: "На вашу почту отправлено письмо для подтверждения аккаунта. (В демо-версии верификация будет автоматической через 5 секунд)",
      });

      // Simulate email verification after 5 seconds
      setTimeout(() => {
        verifyUser(newUser.id);
        // Refresh user data if this is the current user
        const currentUser = getCurrentUser();
        if (currentUser?.id === newUser.id) {
          setUser({...currentUser, verified: true});
        }
        
        toast({
          title: "Аккаунт подтвержден",
          description: "Ваш аккаунт успешно подтвержден. Теперь вы можете войти в систему.",
        });
      }, 5000);

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Ошибка регистрации",
        description: "Произошла ошибка при регистрации.",
        variant: "destructive",
      });
      return false;
    }
  };

  const verifyAccount = async (id: string): Promise<boolean> => {
    try {
      const success = verifyUser(id);
      
      if (success) {
        // Update user if this is the current user
        if (user?.id === id) {
          setUser({...user, verified: true});
        }
        
        toast({
          title: "Аккаунт подтвержден",
          description: "Ваш аккаунт успешно подтвержден.",
        });
        
        return true;
      }
      
      toast({
        title: "Ошибка подтверждения",
        description: "Не удалось подтвердить аккаунт.",
        variant: "destructive",
      });
      return false;
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Ошибка подтверждения",
        description: "Произошла ошибка при подтверждении аккаунта.",
        variant: "destructive",
      });
      return false;
    }
  };

  const isAdmin = user?.role === UserRole.ADMIN;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        logout, 
        register,
        verifyAccount,
        isAdmin,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
