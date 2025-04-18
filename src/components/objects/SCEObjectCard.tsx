
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SCEObject, ContainmentClass, RiskClass } from '@/lib/types';

interface SCEObjectCardProps {
  object: SCEObject;
}

const SCEObjectCard: React.FC<SCEObjectCardProps> = ({ object }) => {
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

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-sce-primary overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg sm:text-xl">
            <span className="text-sce-primary font-mono">SCE-{object.number}</span> {object.name}
          </CardTitle>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge className={getContainmentColor(object.containmentClass)}>
            {object.containmentClass}
          </Badge>
          <Badge className={getRiskColor(object.riskClass)}>
            {object.riskClass}
          </Badge>
          <Badge variant="outline">
            Уровень допуска: {object.clearanceLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {object.description.substring(0, 150)}
          {object.description.length > 150 ? '...' : ''}
        </p>
        <div className="flex justify-end">
          <Link to={`/objects/${object.id}`}>
            <Button variant="outline" className="text-sce-primary hover:text-white hover:bg-sce-primary">
              Подробнее
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SCEObjectCard;
