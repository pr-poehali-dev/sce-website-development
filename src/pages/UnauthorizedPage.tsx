
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <Layout>
      <div className="sce-container py-12 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <Shield className="h-16 w-16 text-sce-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Доступ запрещен</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl">
          У вас нет необходимых прав доступа для просмотра запрашиваемой страницы.
        </p>
        <p className="text-sce-primary mb-8 font-mono">
          [ТРЕБУЕТСЯ БОЛЕЕ ВЫСОКИЙ УРОВЕНЬ ДОПУСКА]
        </p>
        <Link to="/">
          <Button className="bg-sce-primary hover:bg-sce-accent">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;
