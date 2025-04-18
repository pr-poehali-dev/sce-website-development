
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SCEObjectForm from '@/components/objects/SCEObjectForm';
import { useAuth } from '@/components/auth/AuthContext';
import { UserRole } from '@/lib/types';
import { Shield } from 'lucide-react';

const SCEObjectCreate = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Check if user has permission to create objects
  const canCreateObjects = user && (isAdmin || user.role === UserRole.RESEARCHER);
  
  // Handle successful object creation
  const handleSuccess = () => {
    navigate('/objects');
  };
  
  if (!canCreateObjects) {
    return (
      <Layout>
        <div className="sce-container py-12 min-h-[70vh] flex flex-col items-center justify-center text-center">
          <Shield className="h-16 w-16 text-sce-primary mb-4" />
          <h1 className="text-4xl font-bold mb-4">Доступ запрещен</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
            У вас нет прав для создания новых объектов SCE.
          </p>
          <p className="text-sce-primary mb-8 font-mono">
            [ТРЕБУЕТСЯ УРОВЕНЬ ДОСТУПА: АДМИНИСТРАТОР ИЛИ ИССЛЕДОВАТЕЛЬ]
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-8">
        <div className="sce-container">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Создание нового объекта SCE</h1>
          <p>Заполните необходимую информацию о новом аномальном объекте</p>
        </div>
      </div>

      <div className="sce-container py-8">
        <SCEObjectForm onSuccess={handleSuccess} />
      </div>
    </Layout>
  );
};

export default SCEObjectCreate;
