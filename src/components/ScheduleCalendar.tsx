import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface CalendarDay {
  date: Date;
  day: number;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isWeekend: boolean;
  activeSlots: number;
  isSelectable: boolean;
}

interface ScheduleCalendarProps {
  currentMonth: Date;
  selectedDate: string;
  calendarDays: CalendarDay[];
  onMonthChange: (direction: 'prev' | 'next') => void;
  onDateSelect: (dateStr: string) => void;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  currentMonth,
  selectedDate,
  calendarDays,
  onMonthChange,
  onDateSelect
}) => {
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-secondary">Выберите дату</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onMonthChange('prev')}
              className="p-1 text-warm-600 hover:text-warm-800 transition-colors"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <span className="text-lg font-semibold text-secondary min-w-[140px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={() => onMonthChange('next')}
              className="p-1 text-warm-600 hover:text-warm-800 transition-colors"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center text-xs font-medium text-warm-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => day.isSelectable && onDateSelect(day.dateStr)}
              disabled={!day.isSelectable}
              className={`
                p-2 text-sm rounded-lg transition-colors relative
                ${day.isCurrentMonth ? 'text-secondary' : 'text-warm-300'}
                ${day.isToday ? 'bg-primary text-white font-bold' : ''}
                ${day.isSelectable && !day.isToday ? 'hover:bg-warm-100' : ''}
                ${selectedDate === day.dateStr ? 'bg-primary text-white' : ''}
                ${!day.isSelectable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${day.isWeekend && day.isCurrentMonth ? 'bg-blue-50' : ''}
              `}
            >
              <div className="flex flex-col items-center">
                <span>{day.day}</span>
                {day.activeSlots > 0 && (
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-1"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 text-xs text-warm-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span>Есть активные слоты</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-100 rounded-full mr-1"></div>
              <span>Выходной день</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCalendar;