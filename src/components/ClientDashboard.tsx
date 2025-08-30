import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ClientRecord {
  id: string;
  sessionType: string;
  sessionDate: string;
  sessionTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  psychologistName: string;
  price: number;
  createdAt: string;
  clientPhone: string;
  notes?: string;
}

interface ClientDashboardProps {
  clientPhone: string;
  onLogout: () => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ clientPhone, onLogout }) => {
  const [records, setRecords] = useState<ClientRecord[]>([]);

  useEffect(() => {
    // Получаем записи клиента из localStorage
    const loadClientRecords = () => {
      const manualRecords = JSON.parse(localStorage.getItem('manualRecords') || '[]');
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      console.log('Client phone:', clientPhone);
      console.log('Manual records:', manualRecords);
      console.log('Bookings:', bookings);
      
      // Нормализуем номер клиента
      const normalizePhone = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.startsWith('8') ? '7' + cleaned.slice(1) : cleaned;
      };
      
      const normalizedClientPhone = normalizePhone(clientPhone);
      console.log('Normalized client phone:', normalizedClientPhone);
      
      // Фильтруем записи по номеру телефона клиента
      const clientManualRecords = manualRecords.filter((record: any) => {
        if (!record.clientPhone) return false;
        const normalizedRecordPhone = normalizePhone(record.clientPhone);
        console.log(`Comparing: ${normalizedClientPhone} === ${normalizedRecordPhone}`, normalizedClientPhone === normalizedRecordPhone);
        return normalizedRecordPhone === normalizedClientPhone;
      });
      
      const clientBookings = bookings
        .filter((booking: any) => {
          if (!booking.clientPhone) return false;
          const normalizedBookingPhone = normalizePhone(booking.clientPhone);
          return normalizedBookingPhone === normalizedClientPhone;
        })
        .map((booking: any) => ({
          id: booking.id,
          sessionType: 'Консультация',
          sessionDate: booking.date,
          sessionTime: booking.time,
          status: booking.status || 'scheduled',
          psychologistName: booking.psychologistName,
          price: booking.price || 2000,
          createdAt: booking.createdAt || new Date().toLocaleString('ru-RU'),
          clientPhone: booking.clientPhone,
          notes: booking.notes
        }));

      console.log('Found manual records:', clientManualRecords);
      console.log('Found bookings:', clientBookings);

      const allRecords = [...clientManualRecords, ...clientBookings]
        .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime());
      
      console.log('All records:', allRecords);
      setRecords(allRecords);
    };

    loadClientRecords();
  }, [clientPhone]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-warm-100 text-warm-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Запланирована';
      case 'completed': return 'Завершена';
      case 'cancelled': return 'Отменена';
      default: return status;
    }
  };

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 11) {
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-secondary">
              Личный кабинет
            </h1>
            <p className="text-warm-600 mt-1">
              {formatPhone(clientPhone)}
            </p>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="border-warm-300 text-warm-600 hover:bg-warm-50"
          >
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Боковая панель с кнопками связи */}
          {records.length > 0 && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-warm-800 flex items-center text-sm">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Связь с психологом
                  </CardTitle>
                  <p className="text-sm text-warm-600 mt-2">
                    {records.length > 0 ? records[0].psychologistName : 'Анна Петрова'}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    size="sm"
                    onClick={() => window.open('https://zoom.us/start/videomeeting', '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    <Icon name="Video" size={16} className="mr-2" />
                    Видеозвонок
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => {
                      const message = prompt('Напишите сообщение психологу:');
                      if (message && message.trim()) {
                        alert(`Сообщение готово к отправке:\n\n"${message}"\n\nДля отправки используйте любой из мессенджеров ниже.`);
                      }
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                  >
                    <Icon name="Mail" size={16} className="mr-2" />
                    Сообщение
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => {
                      const psychologistPhone = '79001234567';
                      window.open(`https://wa.me/${psychologistPhone}?text=Здравствуйте! Это ваш клиент. У меня вопрос по консультации.`, '_blank');
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white text-xs"
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => {
                      const psychologistTelegram = 'psychologist_username';
                      window.open(`https://t.me/${psychologistTelegram}`, '_blank');
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs"
                  >
                    <Icon name="Send" size={16} className="mr-2" />
                    Telegram
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => {
                      const psychologistPhone = '79001234567';
                      window.open(`sms:${psychologistPhone}?body=Здравствуйте! Это ваш клиент. У меня вопрос по консультации.`, '_blank');
                    }}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xs"
                  >
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    SMS
                  </Button>
                  
                  <div className="mt-3 p-2 bg-warm-50 rounded text-xs text-warm-600">
                    <Icon name="Info" size={12} className="inline mr-1" />
                    Кнопки для связи с вашим психологом
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Записи */}
          <div className={records.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
            <Card>
              <CardHeader>
                <CardTitle className="text-warm-800 flex items-center">
                  <Icon name="Calendar" size={24} className="mr-2" />
                  Мои записи к психологу
                </CardTitle>
              </CardHeader>
          <CardContent>
            {records.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Calendar" size={48} className="mx-auto text-warm-300 mb-4" />
                <h3 className="text-lg font-medium text-warm-600 mb-2">
                  У вас пока нет записей
                </h3>
                <p className="text-warm-500 mb-4">
                  Записывайтесь на консультации с нашими психологами
                </p>
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  Записаться на консультацию
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="border border-warm-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-warm-800">{record.sessionType}</h3>
                        <p className="text-sm text-warm-600">
                          {new Date(record.sessionDate).toLocaleDateString('ru-RU')} в {record.sessionTime}
                        </p>
                        <p className="text-sm text-warm-600 mt-1">
                          <strong>Ваш психолог:</strong> {record.psychologistName}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-warm-600 space-y-1">
                      <p><strong>Стоимость:</strong> {record.price.toLocaleString()} ₽</p>
                      <p><strong>Создано:</strong> {record.createdAt}</p>
                      {record.notes && <p><strong>Заметки:</strong> {record.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;