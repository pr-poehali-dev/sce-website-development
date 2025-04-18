
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { createSCEObject } from '@/lib/mock-data';
import { ContainmentClass, RiskClass, ClearanceLevel, DisruptionClass } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface SCEObjectFormProps {
  onSuccess?: () => void;
}

const SCEObjectForm: React.FC<SCEObjectFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    containmentClass: ContainmentClass.SAFE,
    riskClass: RiskClass.NOTICE,
    disruptionClass: DisruptionClass.DARK,
    clearanceLevel: ClearanceLevel.LEVEL_1,
    description: '',
    containment: '',
    discovery: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!user) {
        toast({
          title: "Ошибка",
          description: "Вы должны быть авторизованы для создания объектов",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.number || !formData.name || !formData.description || !formData.containment) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, заполните все обязательные поля",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Create new SCE object
      const newObject = createSCEObject({
        ...formData,
        createdBy: user.id,
        addenda: [],
        images: []
      });
      
      toast({
        title: "Объект создан",
        description: `SCE-${newObject.number} успешно создан и добавлен в базу данных`,
      });
      
      // Reset form or redirect
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(`/objects/${newObject.id}`);
      }
    } catch (error) {
      console.error('Error creating SCE object:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать объект. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Создание нового SCE объекта</CardTitle>
        <CardDescription>
          Заполните все необходимые поля для создания нового объекта в базе данных Фонда SCE.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="number">Номер объекта</Label>
              <Input
                id="number"
                name="number"
                placeholder="001"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Название объекта</Label>
              <Input
                id="name"
                name="name"
                placeholder="Аномальный объект"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="containmentClass">Класс содержания</Label>
              <Select
                value={formData.containmentClass}
                onValueChange={handleSelectChange('containmentClass')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите класс содержания" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ContainmentClass.SAFE}>SAFE (Безопасный)</SelectItem>
                  <SelectItem value={ContainmentClass.EUCLID}>EUCLID (Евклид)</SelectItem>
                  <SelectItem value={ContainmentClass.KETER}>KETER (Кетер)</SelectItem>
                  <SelectItem value={ContainmentClass.THAUMIEL}>THAUMIEL (Таумиэль)</SelectItem>
                  <SelectItem value={ContainmentClass.APOLLYON}>APOLLYON (Аполлион)</SelectItem>
                  <SelectItem value={ContainmentClass.NEUTRALIZED}>NEUTRALIZED (Нейтрализован)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="riskClass">Класс риска</Label>
              <Select
                value={formData.riskClass}
                onValueChange={handleSelectChange('riskClass')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите класс риска" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={RiskClass.NOTICE}>NOTICE (Уведомление)</SelectItem>
                  <SelectItem value={RiskClass.CAUTION}>CAUTION (Осторожность)</SelectItem>
                  <SelectItem value={RiskClass.WARNING}>WARNING (Предупреждение)</SelectItem>
                  <SelectItem value={RiskClass.DANGER}>DANGER (Опасность)</SelectItem>
                  <SelectItem value={RiskClass.CRITICAL}>CRITICAL (Критический)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clearanceLevel">Уровень допуска</Label>
              <Select
                value={formData.clearanceLevel}
                onValueChange={handleSelectChange('clearanceLevel')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите уровень допуска" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ClearanceLevel.LEVEL_1}>Уровень 1</SelectItem>
                  <SelectItem value={ClearanceLevel.LEVEL_2}>Уровень 2</SelectItem>
                  <SelectItem value={ClearanceLevel.LEVEL_3}>Уровень 3</SelectItem>
                  <SelectItem value={ClearanceLevel.LEVEL_4}>Уровень 4</SelectItem>
                  <SelectItem value={ClearanceLevel.LEVEL_5}>Уровень 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание объекта</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Подробное описание объекта, его аномальных свойств и характеристик..."
              value={formData.description}
              onChange={handleChange}
              className="min-h-[150px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="containment">Процедуры содержания</Label>
            <Textarea
              id="containment"
              name="containment"
              placeholder="Специальные процедуры содержания объекта..."
              value={formData.containment}
              onChange={handleChange}
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discovery">Обстоятельства обнаружения (опционально)</Label>
            <Textarea
              id="discovery"
              name="discovery"
              placeholder="Как и где был обнаружен объект..."
              value={formData.discovery}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/objects')}
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
            'Создать объект'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SCEObjectForm;
