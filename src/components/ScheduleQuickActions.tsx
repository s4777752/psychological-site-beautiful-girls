import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { TimeSlot } from './ScheduleTimeSlots';

interface ScheduleQuickActionsProps {
  selectedDate: string;
  baseTimeSlots: string[];
  scheduleData: {[date: string]: TimeSlot[]};
  onScheduleUpdate: (newScheduleData: {[date: string]: TimeSlot[]}) => void;
}

const ScheduleQuickActions: React.FC<ScheduleQuickActionsProps> = ({
  selectedDate,
  baseTimeSlots,
  scheduleData,
  onScheduleUpdate
}) => {
  const handleActivateAll = () => {
    const allActive = baseTimeSlots.map(time => ({
      time,
      available: true,
      booked: false
    }));
    const newScheduleData = { ...scheduleData, [selectedDate]: allActive };
    onScheduleUpdate(newScheduleData);
  };

  const handleDeactivateAll = () => {
    const allInactive = baseTimeSlots.map(time => ({
      time,
      available: false,
      booked: false
    }));
    const newScheduleData = { ...scheduleData, [selectedDate]: allInactive };
    onScheduleUpdate(newScheduleData);
  };

  const handleSetWorkingHours = () => {
    const workingHours = baseTimeSlots.map(time => {
      const hour = parseInt(time.split(':')[0]);
      return {
        time,
        available: hour >= 9 && hour <= 18,
        booked: false
      };
    });
    const newScheduleData = { ...scheduleData, [selectedDate]: workingHours };
    onScheduleUpdate(newScheduleData);
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-secondary mb-4">Быстрые действия</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleActivateAll}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Активировать все слоты
          </Button>
          
          <Button
            onClick={handleDeactivateAll}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <Icon name="Minus" size={16} className="mr-2" />
            Деактивировать все слоты
          </Button>

          <Button
            onClick={handleSetWorkingHours}
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

export default ScheduleQuickActions;