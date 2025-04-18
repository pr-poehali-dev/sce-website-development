
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/auth/AuthContext';
import { getSCEObjectById, findUserById } from '@/lib/mock-data';
import { SCEObject, ContainmentClass, RiskClass, ClearanceLevel } from '@/lib/types';
import { Shield, AlertTriangle, ArrowLeft, Pencil, Clock, User } from 'lucide-react';

const SCEObjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [object, setObject] = useState<SCEObject | null>(null);
  const [creator, setCreator] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Идентификатор объекта не указан');
      setLoading(false);
      return;
    }

    // Load SCE object
    const sceObject = getSCEObjectById(id);
    
    if (!sceObject) {
      setError('Объект не найден в базе данных');
      setLoading(false);
      return;
    }
    
    setObject(sceObject);
    
    // Get creator name
    const creatorUser = findUserById(sceObject.createdBy);
    setCreator(creatorUser?.username || 'Неизвестный автор');
    
    setLoading(false);
  }, [id]);

  // Helper function to get containment class color
  const getContainmentColor = (containmentClass: ContainmentClass) => {
    switch (containmentClass) {
      case ContainmentClass.SAFE:
        return 'bg-green-600 hover:bg-green-700';
      case ContainmentClass.EUCLID:
        return 'bg-yellow-500 hover:bg-yellow-600';
      case ContainmentClass.KETER:
        return 'bg-red-600 hover:bg-red-700';
      case ContainmentClass.THAUMIEL:
        return 'bg-purple-600 hover:bg-purple-700';
      case ContainmentClass.APOLLYON:
        return 'bg-black hover:bg-gray-900';
      case ContainmentClass.NEUTRALIZED:
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Helper function to get risk class color
  const getRiskColor = (riskClass: RiskClass) => {
    switch (riskClass) {
      case RiskClass.NOTICE:
        return 'bg-blue-500 hover:bg-blue-600';
      case RiskClass.CAUTION:
        return 'bg-yellow-500 hover:bg-yellow-600';
      case RiskClass.WARNING:
        return 'bg-orange-500 hover:bg-orange-600';
      case RiskClass.DANGER:
        return 'bg-red-500 hover:bg-red-600';
      case RiskClass.CRITICAL:
        return 'bg-black hover:bg-gray-900';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="sce-container py-12 text-center">
          <p>Загрузка данных...</p>
        </div>
      </Layout>
    );
  }

  if (error || !object) {
    return (
      <Layout>
        <div className="sce-container py-12">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Произошла ошибка при загрузке объекта'}
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button onClick={() => navigate('/objects')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Назад к списку объектов
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-8">
        <div className="sce-container">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-white text-sce-primary">SCE-{object.number}</Badge>
                <Badge className={getContainmentColor(object.containmentClass)}>
                  {object.containmentClass}
                </Badge>
                <Badge className={getRiskColor(object.riskClass)}>
                  {object.riskClass}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{object.name}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-sce-primary" onClick={() => navigate('/objects')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Назад
              </Button>
              {isAdmin && (
                <Link to={`/objects/${object.id}/edit`}>
                  <Button className="bg-white text-sce-primary hover:bg-gray-100">
                    <Pencil className="mr-2 h-4 w-4" /> Редактировать
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sce-container py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <Badge variant="outline" className="py-1 px-3 text-sm">
              Уровень допуска: {object.clearanceLevel}
            </Badge>
            {object.disruptionClass && (
              <Badge variant="outline" className="py-1 px-3 text-sm">
                Класс разрушения: {object.disruptionClass}
              </Badge>
            )}
            <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
              <Clock className="h-4 w-4" />
              <span>Создан: {new Date(object.createdAt).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>Автор: {creator}</span>
            </div>
          </div>

          <Separator className="my-6" />
          
          <div className="prose max-w-none">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-sce-primary" /> Описание
              </h2>
              <div className="whitespace-pre-line">{object.description}</div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Процедуры содержания</h2>
              <div className="whitespace-pre-line">{object.containment}</div>
            </div>
            
            {object.discovery && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Обстоятельства обнаружения</h2>
                <div className="whitespace-pre-line">{object.discovery}</div>
              </div>
            )}
            
            {object.addenda && object.addenda.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Дополнительные материалы</h2>
                <div className="space-y-4">
                  {object.addenda.map((addendum, index) => (
                    <div key={index} className="border-l-4 border-l-sce-primary pl-4 py-2">
                      <h3 className="font-bold mb-2">Приложение {index + 1}</h3>
                      <div className="whitespace-pre-line">{addendum}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button onClick={() => navigate('/objects')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> К списку объектов
          </Button>
          {isAdmin && (
            <Link to={`/objects/${object.id}/edit`}>
              <Button className="bg-sce-primary hover:bg-sce-accent">
                <Pencil className="mr-2 h-4 w-4" /> Редактировать
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SCEObjectDetail;
