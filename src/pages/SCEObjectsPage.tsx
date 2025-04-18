
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SCEObjectCard from '@/components/objects/SCEObjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/auth/AuthContext';
import { getSCEObjects } from '@/lib/mock-data';
import { SCEObject, ContainmentClass, ClearanceLevel } from '@/lib/types';
import { Shield, Search, Plus, Filter } from 'lucide-react';

const SCEObjectsPage = () => {
  const { user, isAdmin } = useAuth();
  const [objects, setObjects] = useState<SCEObject[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<SCEObject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [containmentFilter, setContainmentFilter] = useState<string>('');
  const [clearanceFilter, setClearanceFilter] = useState<string>('');

  useEffect(() => {
    // Load SCE objects
    const allObjects = getSCEObjects();
    setObjects(allObjects);
    setFilteredObjects(allObjects);
  }, []);

  useEffect(() => {
    // Apply filters when search term or filters change
    let filtered = objects;
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        object => 
          object.number.toLowerCase().includes(term) || 
          object.name.toLowerCase().includes(term) ||
          object.description.toLowerCase().includes(term)
      );
    }
    
    // Containment class filter
    if (containmentFilter) {
      filtered = filtered.filter(object => object.containmentClass === containmentFilter);
    }
    
    // Clearance level filter
    if (clearanceFilter) {
      filtered = filtered.filter(object => object.clearanceLevel === clearanceFilter);
    }
    
    setFilteredObjects(filtered);
  }, [searchTerm, containmentFilter, clearanceFilter, objects]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleContainmentChange = (value: string) => {
    setContainmentFilter(value);
  };

  const handleClearanceChange = (value: string) => {
    setClearanceFilter(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setContainmentFilter('');
    setClearanceFilter('');
  };

  return (
    <Layout>
      <div className="bg-sce-primary text-white py-12">
        <div className="sce-container">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-8 w-8" /> Объекты SCE
              </h1>
              <p className="text-xl">Каталог объектов под наблюдением Фонда SCE</p>
            </div>
            {isAdmin && (
              <Link to="/objects/create">
                <Button className="bg-white text-sce-primary hover:bg-gray-100">
                  <Plus className="mr-2 h-4 w-4" /> Создать объект
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="sce-container py-8">
        {/* Search and filters */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Поиск по номеру или названию..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            
            <Select value={containmentFilter} onValueChange={handleContainmentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Класс содержания" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все классы</SelectItem>
                <SelectItem value={ContainmentClass.SAFE}>SAFE (Безопасный)</SelectItem>
                <SelectItem value={ContainmentClass.EUCLID}>EUCLID (Евклид)</SelectItem>
                <SelectItem value={ContainmentClass.KETER}>KETER (Кетер)</SelectItem>
                <SelectItem value={ContainmentClass.THAUMIEL}>THAUMIEL (Таумиэль)</SelectItem>
                <SelectItem value={ContainmentClass.APOLLYON}>APOLLYON (Аполлион)</SelectItem>
                <SelectItem value={ContainmentClass.NEUTRALIZED}>NEUTRALIZED (Нейтрализован)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={clearanceFilter} onValueChange={handleClearanceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Уровень допуска" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все уровни</SelectItem>
                <SelectItem value={ClearanceLevel.LEVEL_1}>Уровень 1</SelectItem>
                <SelectItem value={ClearanceLevel.LEVEL_2}>Уровень 2</SelectItem>
                <SelectItem value={ClearanceLevel.LEVEL_3}>Уровень 3</SelectItem>
                <SelectItem value={ClearanceLevel.LEVEL_4}>Уровень 4</SelectItem>
                <SelectItem value={ClearanceLevel.LEVEL_5}>Уровень 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {(searchTerm || containmentFilter || clearanceFilter) && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500 flex items-center">
                <Filter className="mr-2 h-4 w-4" /> 
                Найдено объектов: {filteredObjects.length}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Очистить фильтры
              </Button>
            </div>
          )}
        </div>
        
        {/* Objects list */}
        <div className="space-y-6">
          {filteredObjects.length > 0 ? (
            filteredObjects.map(object => (
              <SCEObjectCard key={object.id} object={object} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border">
              <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Объекты не найдены</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || containmentFilter || clearanceFilter
                  ? 'Нет объектов, соответствующих заданным критериям поиска.'
                  : 'В базе данных пока нет объектов SCE.'
                }
              </p>
              {isAdmin && (
                <Link to="/objects/create">
                  <Button className="bg-sce-primary hover:bg-sce-accent">
                    <Plus className="mr-2 h-4 w-4" /> Создать первый объект
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SCEObjectsPage;
