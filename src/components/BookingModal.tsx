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

  // Генерация доступных временных слотов на основе расписания психолога
  const getTimeSlots = (date: string): TimeSlot[] => {
    if (!date) return [];
    
    // Получаем расписание психолога из localStorage
    const scheduleData = JSON.parse(localStorage.getItem('psychologistSchedule') || '{}');
    const psychologistSlots = scheduleData[date];
    
    if (psychologistSlots) {
      // Используем расписание психолога
      return psychologistSlots.map((slot: any) => ({
        time: slot.time,
        available: slot.available && !slot.booked
      }));
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
      const isPast = date < today;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isWeekend,
        isAvailable: isCurrentMonth && !isPast
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date: Date) => {
    if (date < new Date()) return;
    setSelectedDate(date.toISOString().split('T')[0]);
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
            
            <p className="text-sm text-warm-600 mb-4">
              <Icon name="Info" size={14} className="inline mr-1" />
              Работаем 7 дней в неделю. Выходные дни выделены голубым цветом.
            </p>

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
                    p-2 text-sm rounded-lg transition-colors relative
                    ${day.isCurrentMonth ? 'text-secondary' : 'text-warm-300'}
                    ${day.isToday ? 'bg-primary text-white font-bold' : ''}
                    ${day.isAvailable && !day.isToday ? 'hover:bg-warm-100' : ''}
                    ${selectedDate === day.date.toISOString().split('T')[0] ? 'bg-primary text-white' : ''}
                    ${!day.isAvailable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${day.isWeekend && day.isCurrentMonth ? 'bg-blue-50 border border-blue-200' : ''}
                  `}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-secondary">
                  Доступное время на {new Date(selectedDate).toLocaleDateString('ru-RU')}
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
                    {slot.time} - {String(parseInt(slot.time.split(':')[0]) + 1).padStart(2, '0')}:00
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
                  <p><strong>Дата:</strong> {new Date(selectedDate).toLocaleDateString('ru-RU')}</p>
                  <p><strong>Время:</strong> {selectedTime}</p>
                  <p><strong>Длительность:</strong> 24 часа</p>
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