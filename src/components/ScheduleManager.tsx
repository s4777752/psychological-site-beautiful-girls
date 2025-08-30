import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface TimeSlot {
  time: string;
  available: boolean;
  booked: boolean;
}

interface ScheduleManagerProps {
  psychologistName: string;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ psychologistName }) => {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Базовые временные слоты
  const baseTimeSlots: string[] = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', 
    '21:00', '22:00', '23:00'
  ];

  // Функция для форматирования времени
  const formatTime = (time: string) => {
    return time === '24:00' ? '00:00' : time;
  };

  // Индивидуальное расписание для каждого психолога
  const psychologistScheduleKey = `psychologistSchedule_${psychologistName.replace(/\s+/g, '_')}`;
  
  // Состояние временных слотов для каждой даты
  const [scheduleData, setScheduleData] = useState<{[date: string]: TimeSlot[]}>(() => {
    const savedSchedule = localStorage.getItem(psychologistScheduleKey);
    const data = savedSchedule ? JSON.parse(savedSchedule) : {};
    
    // Автоматически активируем текущую дату для нового психолога
    const todayDate = new Date();
    const today = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
    if (!data[today]) {
      data[today] = baseTimeSlots.map(time => ({
        time,
        available: true,
        booked: false
      }));
    }
    
    return data;
  });

  // Сохраняем изменения при инициализации
  useEffect(() => {
    localStorage.setItem(psychologistScheduleKey, JSON.stringify(scheduleData));
  }, [scheduleData, psychologistScheduleKey]);

  // Получение слотов для конкретной даты
  const getTimeSlotsForDate = (date: string): TimeSlot[] => {
    if (!scheduleData[date]) {
      // Инициализация с выключенными слотами
      return baseTimeSlots.map(time => ({
        time,
        available: false,
        booked: false
      }));
    }
    return scheduleData[date];
  };

  // Переключение доступности слота
  const toggleSlotAvailability = (date: string, time: string) => {
    const currentSlots = getTimeSlotsForDate(date);
    const updatedSlots = currentSlots.map(slot => {
      if (slot.time === time && !slot.booked) {
        return { ...slot, available: !slot.available };
      }
      return slot;
    });
    
    const newScheduleData = {
      ...scheduleData,
      [date]: updatedSlots
    };
    
    setScheduleData(newScheduleData);
    
    // Сохраняем в localStorage для использования в BookingModal
    localStorage.setItem(psychologistScheduleKey, JSON.stringify(newScheduleData));
  };

  // Активация всех слотов на дату с учетом существующих записей
  const activateAllSlotsForDate = (date: string) => {
    // Получаем существующие записи
    const manualRecords = JSON.parse(localStorage.getItem('manualRecords') || '[]');
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Фильтруем записи для данного психолога и даты
    const psychologistManualRecords = manualRecords.filter((record: any) => 
      record.sessionDate === date && 
      record.status !== 'cancelled'
    );
    
    const psychologistBookings = existingBookings.filter((booking: any) => 
      booking.psychologistName === psychologistName && 
      booking.date === date && 
      booking.status !== 'cancelled'
    );
    
    const updatedSlots = baseTimeSlots.map(time => {
      // Проверяем, есть ли записи на это время
      const isManuallyBooked = psychologistManualRecords.some((record: any) => 
        record.sessionTime === time
      );
      
      const isAlreadyBooked = psychologistBookings.some((booking: any) => 
        booking.time === time
      );
      
      return {
        time,
        available: true,
        booked: isManuallyBooked || isAlreadyBooked
      };
    });
    
    const newScheduleData = { ...scheduleData, [date]: updatedSlots };
    setScheduleData(newScheduleData);
    localStorage.setItem(psychologistScheduleKey, JSON.stringify(newScheduleData));
  };

  // Генерация календаря
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      // Разрешаем управление расписанием с текущего дня (включительно)
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      const dateStr = date.toISOString().split('T')[0];
      const slots = getTimeSlotsForDate(dateStr);
      const activeSlots = slots.filter(slot => slot.available).length;
      
      days.push({
        date,
        day: date.getDate(),
        dateStr,
        isCurrentMonth,
        isToday,
        isPast,
        isWeekend,
        activeSlots,
        isSelectable: isCurrentMonth && !isPast
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const timeSlots = getTimeSlotsForDate(selectedDate);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  // Функция для правильного форматирования даты без проблем с часовыми поясами
  const formatSelectedDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    // Используем текущую дату вместо переданной для отладки
    const currentDate = new Date();
    const actualYear = currentDate.getFullYear();
    const actualMonth = currentDate.getMonth();
    const actualDay = currentDate.getDate();
    
    const monthName = monthNames[actualMonth];
    const dayName = weekDays[currentDate.getDay()];
    
    return `${actualDay} ${monthName.toLowerCase()} ${actualYear} г. (${dayName})`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-secondary mb-2">
          Управление расписанием
        </h2>
        <p className="text-warm-600">
          Активируйте временные слоты, когда вы доступны для консультаций
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Календарь */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-secondary">Выберите дату</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 text-warm-600 hover:text-warm-800 transition-colors"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <span className="text-lg font-semibold text-secondary min-w-[140px] text-center">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
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
                  onClick={() => day.isSelectable && setSelectedDate(day.dateStr)}
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

        {/* Временные слоты */}
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
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          Забронировано
                        </span>
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
                    onClick={() => toggleSlotAvailability(selectedDate, slot.time)}
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
      </div>

      {/* Быстрые действия */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4">Быстрые действия</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                const allActive = baseTimeSlots.map(time => ({
                  time,
                  available: true,
                  booked: false
                }));
                const newScheduleData = { ...scheduleData, [selectedDate]: allActive };
                setScheduleData(newScheduleData);
                localStorage.setItem(psychologistScheduleKey, JSON.stringify(newScheduleData));
              }}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Активировать все слоты
            </Button>
            
            <Button
              onClick={() => {
                const allInactive = baseTimeSlots.map(time => ({
                  time,
                  available: false,
                  booked: false
                }));
                const newScheduleData = { ...scheduleData, [selectedDate]: allInactive };
                setScheduleData(newScheduleData);
                localStorage.setItem(psychologistScheduleKey, JSON.stringify(newScheduleData));
              }}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Icon name="Minus" size={16} className="mr-2" />
              Деактивировать все слоты
            </Button>

            <Button
              onClick={() => {
                const workingHours = baseTimeSlots.map(time => {
                  const hour = parseInt(time.split(':')[0]);
                  return {
                    time,
                    available: hour >= 9 && hour <= 18,
                    booked: false
                  };
                });
                const newScheduleData = { ...scheduleData, [selectedDate]: workingHours };
                setScheduleData(newScheduleData);
                localStorage.setItem(psychologistScheduleKey, JSON.stringify(newScheduleData));
              }}
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Icon name="Clock" size={16} className="mr-2" />
              Рабочие часы (9:00-18:00)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManager;