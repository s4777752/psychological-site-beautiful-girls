import React, { useState, useEffect } from 'react';
import ScheduleCalendar, { CalendarDay } from './ScheduleCalendar';
import ScheduleTimeSlots, { TimeSlot } from './ScheduleTimeSlots';
import ScheduleQuickActions from './ScheduleQuickActions';

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

    if (!scheduleData[date]) {
      // Инициализация с выключенными слотами, но с учетом существующих записей
      return baseTimeSlots.map(time => {
        const isManuallyBooked = psychologistManualRecords.some((record: any) => 
          record.sessionTime === time
        );
        
        const isAlreadyBooked = psychologistBookings.some((booking: any) => 
          booking.time === time
        );
        
        return {
          time,
          available: false,
          booked: isManuallyBooked || isAlreadyBooked
        };
      });
    }

    // Обновляем существующие слоты с учетом записей
    return scheduleData[date].map(slot => {
      const isManuallyBooked = psychologistManualRecords.some((record: any) => 
        record.sessionTime === slot.time
      );
      
      const isAlreadyBooked = psychologistBookings.some((booking: any) => 
        booking.time === slot.time
      );

      return {
        ...slot,
        booked: isManuallyBooked || isAlreadyBooked
      };
    });
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

  // Генерация календаря
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
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

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    } else {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    }
  };

  const handleScheduleUpdate = (newScheduleData: {[date: string]: TimeSlot[]}) => {
    setScheduleData(newScheduleData);
    localStorage.setItem(psychologistScheduleKey, JSON.stringify(newScheduleData));
  };

  const calendarDays = generateCalendarDays();
  const timeSlots = getTimeSlotsForDate(selectedDate);

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
        <ScheduleCalendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          calendarDays={calendarDays}
          onMonthChange={handleMonthChange}
          onDateSelect={setSelectedDate}
        />

        {/* Временные слоты */}
        <ScheduleTimeSlots
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          psychologistName={psychologistName}
          onToggleSlot={toggleSlotAvailability}
        />
      </div>

      {/* Быстрые действия */}
      <ScheduleQuickActions
        selectedDate={selectedDate}
        baseTimeSlots={baseTimeSlots}
        scheduleData={scheduleData}
        onScheduleUpdate={handleScheduleUpdate}
      />
    </div>
  );
};

export default ScheduleManager;