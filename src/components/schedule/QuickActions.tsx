import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface QuickActionsProps {
  selectedDate: string;
  onActivateAll: () => void;
  onDeactivateAll: () => void;
  onSetWorkingHours: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  selectedDate,
  onActivateAll,
  onDeactivateAll,
  onSetWorkingHours
}) => {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-secondary mb-4">Быстрые действия</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={onActivateAll}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Активировать все слоты
          </Button>
          
          <Button
            onClick={onDeactivateAll}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <Icon name="Minus" size={16} className="mr-2" />
            Деактивировать все слоты
          </Button>

          <Button
            onClick={onSetWorkingHours}
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Icon name="Clock" size={16} className="mr-2" />
            Рабочие часы (9:00-18:00)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;