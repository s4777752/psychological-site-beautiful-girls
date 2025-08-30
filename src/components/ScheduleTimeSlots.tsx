import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export interface TimeSlot {
  time: string;
  available: boolean;
  booked: boolean;
}

interface ScheduleTimeSlotsProps {
  selectedDate: string;
  timeSlots: TimeSlot[];
  psychologistName: string;
  onToggleSlot: (date: string, time: string) => void;
}

const ScheduleTimeSlots: React.FC<ScheduleTimeSlotsProps> = ({
  selectedDate,
  timeSlots,
  psychologistName,
  onToggleSlot
}) => {
  const formatTime = (time: string) => {
    return time === '24:00' ? '00:00' : time;
  };

  const formatSelectedDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    const monthNames = [
      'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
      'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    
    const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    
    const monthName = monthNames[date.getMonth()];
    const dayName = weekDays[date.getDay()];
    
    return `${day} ${monthName} ${year} г. (${dayName})`;
  };

  const generateDoxyRoomName = (psychName: string, date: string, time: string): string => {
    const cleanPsychName = psychName.replace(/\s+/g, '-').toLowerCase();
    const cleanDate = date.replace(/-/g, '');
    const cleanTime = time.replace(':', '');
    return `${cleanPsychName}-${cleanDate}${cleanTime}`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-secondary mb-2">
            Временные слоты на {formatSelectedDate(selectedDate)}
          </h3>
          <p className="text-sm text-warm-600">
            Нажмите + чтобы активировать слот, - чтобы деактивировать
          </p>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {timeSlots.map(slot => (
            <div
              key={slot.time}
              className={`
                flex items-center justify-between p-3 rounded-lg border-2 transition-colors
                ${slot.booked 
                  ? 'border-red-200 bg-red-50' 
                  : slot.available 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-warm-200 bg-white'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium text-secondary">{formatTime(slot.time)}</span>
                <div className="flex items-center space-x-2">
                  {slot.booked && (
                    <>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        Забронировано
                      </span>
                      <Button
                        size="sm"
                        onClick={() => {
                          const roomName = generateDoxyRoomName(psychologistName, selectedDate, slot.time);
                          const doxyUrl = `https://doxy.me/${roomName}`;
                          window.open(doxyUrl, '_blank');
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs ml-2"
                      >
                        <Icon name="Video" size={12} className="mr-1" />
                        Doxy.me
                      </Button>
                    </>
                  )}
                  {slot.available && !slot.booked && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Доступно
                    </span>
                  )}
                  {!slot.available && !slot.booked && (
                    <span className="text-xs bg-warm-100 text-warm-600 px-2 py-1 rounded-full">
                      Неактивно
                    </span>
                  )}
                </div>
              </div>

              <Button
                size="sm"
                variant={slot.available ? "destructive" : "default"}
                onClick={() => onToggleSlot(selectedDate, slot.time)}
                disabled={slot.booked}
                className={`
                  w-8 h-8 p-0
                  ${slot.available 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-red-500 hover:bg-red-600'
                  }
                  ${slot.booked ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <Icon 
                  name={slot.available ? "Plus" : "Minus"} 
                  size={16} 
                  className="text-white"
                />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-warm-50 rounded-lg">
          <div className="text-sm text-warm-700">
            <div className="font-medium mb-1">Статистика:</div>
            <div className="space-y-1">
              <div>Активных слотов: {timeSlots.filter(s => s.available).length}</div>
              <div>Забронированных: {timeSlots.filter(s => s.booked).length}</div>
              <div>Неактивных: {timeSlots.filter(s => !s.available && !s.booked).length}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleTimeSlots;