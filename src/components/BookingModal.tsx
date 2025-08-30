import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import PaymentForm from '@/components/PaymentForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  psychologistName: string;
  psychologistSpecialty: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  psychologistName,
  psychologistSpecialty
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [step, setStep] = useState<'date' | 'payment' | 'confirmation'>('date');

  // Генерация доступных временных слотов на основе индивидуального расписания психолога
  const getTimeSlots = (date: string): TimeSlot[] => {
    if (!date) return [];
    
    // Создаем уникальный ключ для каждого психолога
    const psychologistScheduleKey = `psychologistSchedule_${psychologistName.replace(/\s+/g, '_')}`;
    
    // Получаем индивидуальное расписание психолога из localStorage
    const scheduleData = JSON.parse(localStorage.getItem(psychologistScheduleKey) || '{}');
    const psychologistSlots = scheduleData[date];
    
    // Получаем ручные записи психолога
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
    
    if (psychologistSlots) {
      // Используем расписание конкретного психолога
      return psychologistSlots.map((slot: any) => {
        // Проверяем, занят ли этот слот ручными записями или существующими бронированиями
        const isManuallyBooked = psychologistManualRecords.some((record: any) => 
          record.sessionTime === slot.time
        );
        
        const isAlreadyBooked = psychologistBookings.some((booking: any) => 
          booking.time === slot.time
        );
        
        return {
          time: slot.time,
          available: slot.available && !slot.booked && !isManuallyBooked && !isAlreadyBooked
        };
      });
    }
    
    // Если расписание не настроено, возвращаем пустой массив
    return [];
  };

  const timeSlots = getTimeSlots(selectedDate);

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
      // Разрешаем запись с текущего дня (включительно)
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      // Проверяем наличие доступных слотов для данной даты
      const dateStr = date.toISOString().split('T')[0];
      const dateSlots = getTimeSlots(dateStr);
      const hasAvailableSlots = dateSlots.some(slot => slot.available);
      
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isWeekend,
        hasAvailableSlots,
        isAvailable: isCurrentMonth && !isPast && hasAvailableSlots
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date: Date) => {
    // Разрешаем выбор начиная с текущего дня
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (date < todayStart) return;
    
    // Формируем дату в формате YYYY-MM-DD без влияния часового пояса
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
    setSelectedTime('');
  };

  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep('payment');
    }
  };

  const handlePaymentSuccess = (clientData: {name: string, email: string, phone: string}) => {
    // Создаем запись о бронировании
    const booking = {
      id: Date.now().toString(),
      psychologistName,
      psychologistSpecialty,
      date: selectedDate,
      time: selectedTime,
      clientName: clientData.name,
      clientEmail: clientData.email,
      clientPhone: clientData.phone,
      status: 'paid',
      paymentStatus: 'completed',
      amount: 2500,
      createdAt: new Date().toISOString()
    };

    // Сохраняем в localStorage для отображения в кабинетах
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    // Обновляем индивидуальное расписание психолога - помечаем слот как забронированный
    const psychologistScheduleKey = `psychologistSchedule_${psychologistName.replace(/\s+/g, '_')}`;
    const scheduleData = JSON.parse(localStorage.getItem(psychologistScheduleKey) || '{}');
    if (scheduleData[selectedDate]) {
      scheduleData[selectedDate] = scheduleData[selectedDate].map((slot: any) => {
        if (slot.time === selectedTime) {
          return { ...slot, booked: true };
        }
        return slot;
      });
      localStorage.setItem(psychologistScheduleKey, JSON.stringify(scheduleData));
    }

    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('date');
    setSelectedDate('');
    setSelectedTime('');
    onClose();
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  // Функция для правильного форматирования даты без проблем с часовыми поясами
  const formatSelectedDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-montserrat font-bold text-secondary">
                {step === 'date' && 'Запись к специалисту'}
                {step === 'payment' && 'Оплата сеанса'}
                {step === 'confirmation' && 'Запись подтверждена'}
              </h3>
              <p className="text-warm-600 mt-1">
                {psychologistName} • {psychologistSpecialty}
              </p>
              {step === 'payment' && selectedDate && selectedTime && (
                <p className="text-primary mt-1 font-medium">
                  {new Date(selectedDate).toLocaleDateString('ru-RU')} в {selectedTime}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="text-warm-500 hover:text-warm-700 transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step === 'date' ? 'bg-primary text-white' : 'bg-green-500 text-white'
              }`}>
                {step === 'date' ? '1' : <Icon name="Check" size={16} />}
              </div>
              <div className={`h-0.5 w-16 ${step === 'date' ? 'bg-gray-300' : 'bg-green-500'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step === 'payment' ? 'bg-primary text-white' : 
                step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step === 'confirmation' ? <Icon name="Check" size={16} /> : '2'}
              </div>
              <div className={`h-0.5 w-16 ${step === 'confirmation' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step === 'confirmation' ? <Icon name="Check" size={16} /> : '3'}
              </div>
            </div>
          </div>

          {/* Step 1: Date and Time Selection */}
          {step === 'date' && (
            <>
              {/* Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-secondary">Выберите дату</h4>
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
            
            <div className="text-xs text-warm-600 mb-4 space-y-1">
              <p>
                <Icon name="Info" size={12} className="inline mr-1" />
                Работаем 7 дней в неделю. Выходные дни выделены голубым цветом.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Есть свободные слоты</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <span>Сегодня / Выбранная дата</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-warm-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day.date)}
                  disabled={!day.isAvailable}
                  className={`
                    p-2 text-sm rounded-lg transition-colors relative min-h-[40px] flex flex-col items-center justify-center
                    ${day.isCurrentMonth ? 'text-secondary' : 'text-warm-300'}
                    ${day.isToday ? 'bg-primary text-white font-bold' : ''}
                    ${day.isAvailable && !day.isToday ? 'hover:bg-warm-100' : ''}
                    ${selectedDate === `${day.date.getFullYear()}-${(day.date.getMonth() + 1).toString().padStart(2, '0')}-${day.date.getDate().toString().padStart(2, '0')}` ? 'bg-primary text-white' : ''}
                    ${!day.isAvailable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${day.isWeekend && day.isCurrentMonth ? 'bg-blue-50 border border-blue-200' : ''}
                  `}
                >
                  <span>{day.day}</span>
                  {day.hasAvailableSlots && (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-secondary">
                  Доступное время на {formatSelectedDate(selectedDate)}
                </h4>
                {(() => {
                  const selectedDateObj = new Date(selectedDate);
                  const isWeekend = selectedDateObj.getDay() === 0 || selectedDateObj.getDay() === 6;
                  return isWeekend ? (
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Выходной день
                    </span>
                  ) : (
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Рабочий день
                    </span>
                  );
                })()}
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map(slot => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`
                      p-3 rounded-lg border-2 transition-colors text-sm font-medium
                      ${slot.available 
                        ? 'border-warm-200 hover:border-primary hover:bg-primary hover:text-white' 
                        : 'border-warm-100 bg-warm-50 text-warm-400 cursor-not-allowed'
                      }
                      ${selectedTime === slot.time ? 'border-primary bg-primary text-white' : 'text-secondary'}
                    `}
                  >
                    {slot.time}
                    {!slot.available && (
                      <div className="text-xs mt-1">Занято</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

              {/* Date Selection Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 border-2 border-warm-200 text-warm-700 rounded-lg hover:bg-warm-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleDateTimeConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-colors
                    ${selectedDate && selectedTime
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-warm-200 text-warm-500 cursor-not-allowed'
                    }
                  `}
                >
                  Перейти к оплате
                </button>
              </div>
            </>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <div>
              <PaymentForm
                psychologistName={psychologistName}
                sessionPrice={2500}
                onClose={() => setStep('date')}
                onPaymentSuccess={handlePaymentSuccess}
              />
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setStep('date')}
                  className="px-6 py-3 border-2 border-warm-200 text-warm-700 rounded-lg hover:bg-warm-50 transition-colors"
                >
                  Назад
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} className="text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-secondary mb-2">
                  Запись успешно создана!
                </h4>
                <p className="text-warm-600">
                  Оплата прошла успешно. Вы получите подтверждение на указанный email.
                </p>
              </div>
              <div className="bg-warm-50 rounded-lg p-4 mb-6">
                <div className="text-left">
                  <p><strong>Психолог:</strong> {psychologistName}</p>
                  <p><strong>Специализация:</strong> {psychologistSpecialty}</p>
                  <p><strong>Дата:</strong> {formatSelectedDate(selectedDate)}</p>
                  <p><strong>Время:</strong> {selectedTime}</p>
                  <p><strong>Длительность:</strong> 50 минут</p>
                  <p><strong>Стоимость:</strong> 2 500 ₽</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;