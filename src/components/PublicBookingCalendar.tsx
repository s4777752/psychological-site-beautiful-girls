import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';
import { usePsychologists } from '@/hooks/usePsychologists';

interface TimeSlot {
  time: string;
  available: boolean;
  booked: boolean;
}

interface BookingData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  psychologist: string;
}

const PublicBookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPsychologist, setSelectedPsychologist] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    psychologist: ''
  });

  const { psychologists } = usePsychologists();
  const { toast } = useToast();

  // Получение расписания конкретного психолога из localStorage
  const getScheduleData = (psychologistName: string): {[date: string]: TimeSlot[]} => {
    const psychologistScheduleKey = `psychologistSchedule_${psychologistName.replace(/\s+/g, '_')}`;
    const savedSchedule = localStorage.getItem(psychologistScheduleKey);
    return savedSchedule ? JSON.parse(savedSchedule) : {};
  };

  // Получение доступных слотов для даты (объединение всех психологов)
  const getAvailableSlotsForDate = (date: string): TimeSlot[] => {
    const activePsychologists = psychologists.filter(p => p.isActive);
    const allSlots: TimeSlot[] = [];
    
    activePsychologists.forEach(psychologist => {
      const scheduleData = getScheduleData(psychologist.name);
      if (scheduleData[date]) {
        const availableSlots = scheduleData[date].filter(slot => slot.available && !slot.booked);
        allSlots.push(...availableSlots);
      }
    });
    
    // Убираем дубликаты по времени, оставляя уникальные слоты
    const uniqueSlots = allSlots.reduce((unique: TimeSlot[], current) => {
      if (!unique.find(slot => slot.time === current.time)) {
        unique.push(current);
      }
      return unique;
    }, []);
    
    return uniqueSlots.sort((a, b) => a.time.localeCompare(b.time));
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
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      const dateStr = date.toISOString().split('T')[0];
      const availableSlots = getAvailableSlotsForDate(dateStr);
      
      days.push({
        date,
        day: date.getDate(),
        dateStr,
        isCurrentMonth,
        isToday,
        isPast,
        availableSlots: availableSlots.length,
        isSelectable: isCurrentMonth && !isPast && availableSlots.length > 0
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const availableSlots = getAvailableSlotsForDate(selectedDate);
  const activePsychologists = psychologists.filter(p => p.isActive);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedPsychologist) {
      setShowBookingForm(true);
      setBookingData({
        ...bookingData,
        date: selectedDate,
        time: time,
        psychologist: selectedPsychologist
      });
    }
  };

  const handlePsychologistSelect = (psychId: string) => {
    setSelectedPsychologist(psychId);
    if (selectedTime) {
      setShowBookingForm(true);
      setBookingData({
        ...bookingData,
        date: selectedDate,
        time: selectedTime,
        psychologist: psychId
      });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Здесь будет логика отправки заявки
    toast({
      title: "Заявка отправлена!",
      description: `Мы свяжемся с вами в ближайшее время для подтверждения записи на ${new Date(bookingData.date).toLocaleDateString('ru-RU')} в ${bookingData.time}`,
    });

    // Сброс формы
    setShowBookingForm(false);
    setSelectedTime('');
    setSelectedPsychologist('');
    setBookingData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      psychologist: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-montserrat font-bold text-secondary mb-4">
          Онлайн запись на консультацию
        </h2>
        <p className="text-warm-600 text-lg">
          Выберите удобное время для консультации с психологом
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Календарь */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-secondary">Выберите дату</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 text-warm-600 hover:text-warm-800 hover:bg-warm-100 rounded-lg transition-colors"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <span className="text-lg font-semibold text-secondary min-w-[160px] text-center">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 text-warm-600 hover:text-warm-800 hover:bg-warm-100 rounded-lg transition-colors"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-warm-600">
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
                    p-3 text-sm rounded-lg transition-colors relative min-h-[48px] flex flex-col items-center justify-center
                    ${day.isCurrentMonth ? 'text-secondary' : 'text-warm-300'}
                    ${day.isToday ? 'bg-primary text-white font-bold' : ''}
                    ${day.isSelectable && !day.isToday ? 'hover:bg-warm-100 cursor-pointer' : ''}
                    ${selectedDate === day.dateStr && !day.isToday ? 'bg-primary text-white' : ''}
                    ${!day.isSelectable ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                >
                  <span>{day.day}</span>
                  {day.availableSlots > 0 && (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 text-xs text-warm-600">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Есть свободное время</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <span>Выбранная дата</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Доступные слоты */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-secondary mb-4">
              Доступные слоты на {new Date(selectedDate).toLocaleDateString('ru-RU')}
            </h3>
            
            {availableSlots.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableSlots.map(slot => (
                  <Button
                    key={slot.time}
                    onClick={() => handleTimeSelect(slot.time)}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className={`w-full justify-start text-left ${
                      selectedTime === slot.time 
                        ? 'bg-primary text-white' 
                        : 'border-warm-200 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon name="Clock" size={16} className="mr-2" />
                    {slot.time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-warm-500">
                <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
                <p>На выбранную дату нет доступных слотов</p>
                <p className="text-sm mt-1">Попробуйте выбрать другую дату</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Выбор психолога */}
      {selectedTime && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-secondary mb-4">
              Выберите психолога
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePsychologists.map(psychologist => (
                <Button
                  key={psychologist.id}
                  onClick={() => handlePsychologistSelect(psychologist.id)}
                  variant={selectedPsychologist === psychologist.id ? "default" : "outline"}
                  className={`h-auto p-4 text-left ${
                    selectedPsychologist === psychologist.id
                      ? 'bg-primary text-white border-primary'
                      : 'border-warm-200 hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-full bg-warm-200 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-medium">{psychologist.name}</div>
                      <div className="text-sm opacity-80">{psychologist.specialization}</div>
                      <div className="text-sm opacity-60">{psychologist.experience} лет опыта</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Форма записи */}
      {showBookingForm && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-secondary mb-4">
              Заполните данные для записи
            </h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    required
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    required
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="bg-warm-50 p-4 rounded-lg">
                <h4 className="font-medium text-secondary mb-2">Детали записи:</h4>
                <div className="space-y-1 text-sm text-warm-700">
                  <p><strong>Дата:</strong> {new Date(selectedDate).toLocaleDateString('ru-RU')}</p>
                  <p><strong>Время:</strong> {selectedTime}</p>
                  <p><strong>Психолог:</strong> {activePsychologists.find(p => p.id === selectedPsychologist)?.name}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  <Icon name="Calendar" className="mr-2" size={16} />
                  Записаться на консультацию
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowBookingForm(false)}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PublicBookingCalendar;