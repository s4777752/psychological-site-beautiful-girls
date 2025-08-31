import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PaymentNotification {
  id: string;
  psychologistName: string;
  psychologistSpecialty: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  amount: number;
  status: 'paid' | 'pending' | 'cancelled';
  paymentStatus: 'completed' | 'processing' | 'failed';
  createdAt: string;
}

interface PaymentNotificationsProps {
  userRole: 'psychologist' | 'manager';
  psychologistName?: string;
}

const PaymentNotifications: React.FC<PaymentNotificationsProps> = ({ 
  userRole, 
  psychologistName 
}) => {
  // Загружаем данные о бронированиях из localStorage
  const getBookings = (): PaymentNotification[] => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    if (userRole === 'psychologist' && psychologistName) {
      // Фильтруем только записи к текущему психологу
      return bookings.filter((booking: PaymentNotification) => 
        booking.psychologistName === psychologistName
      );
    }
    
    // Для управляющего показываем все записи
    return bookings;
  };

  const bookings = getBookings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Оплачено';
      case 'completed':
        return 'Завершено';
      case 'pending':
        return 'Ожидает';
      case 'processing':
        return 'Обработка';
      case 'cancelled':
        return 'Отменено';
      case 'failed':
        return 'Ошибка';
      default:
        return status;
    }
  };

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Icon name="Bell" size={20} className="mr-2" />
            {userRole === 'psychologist' ? 'Ваши записи' : 'Все записи'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Пока нет записей</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon name="Bell" size={20} className="mr-2" />
            {userRole === 'psychologist' ? 'Ваши записи' : 'Все записи'}
          </div>
          <Badge variant="secondary">
            {bookings.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {userRole === 'manager' && `${booking.psychologistName} • `}
                    {booking.psychologistSpecialty}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.date).toLocaleDateString('ru-RU')} в {booking.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(booking.status)}>
                    {getStatusText(booking.status)}
                  </Badge>
                  <Badge className={getStatusColor(booking.paymentStatus)}>
                    {getStatusText(booking.paymentStatus)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">
                    <Icon name="User" size={14} className="inline mr-1" />
                    <strong>Клиент:</strong> {booking.clientName || 'Не указано'}
                  </p>
                  <p className="text-gray-600">
                    <Icon name="Mail" size={14} className="inline mr-1" />
                    <strong>Email:</strong> {booking.clientEmail || 'Не указано'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <Icon name="Phone" size={14} className="inline mr-1" />
                    <strong>Телефон:</strong> {booking.clientPhone || 'Не указано'}
                  </p>
                  <p className="text-gray-600">
                    <Icon name="CreditCard" size={14} className="inline mr-1" />
                    <strong>Сумма:</strong> {booking.amount.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Создано: {new Date(booking.createdAt).toLocaleString('ru-RU')}
                  </p>
                  
                  {(booking.paymentStatus === 'paid' || booking.paymentStatus === 'completed' || booking.status === 'completed') && booking.clientPhone && (
                    <div className="mt-2 pt-3 border-t border-warm-200">
                      <p className="text-sm font-medium text-warm-700 mb-3">Связь с клиентом:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            const roomName = `${booking.psychologistName.replace(/\s+/g, '-').toLowerCase()}-${booking.date.replace(/-/g, '')}${booking.time.replace(':', '')}`;
                            const doxyUrl = `https://doxy.me/${roomName}`;
                            window.open(doxyUrl, '_blank');
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs"
                        >
                          <Icon name="Video" size={14} className="mr-1" />
                          Doxy.me
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => {
                            const message = prompt(`Напишите сообщение для ${booking.clientName}:`);
                            if (message && message.trim()) {
                              const chatId = `${booking.psychologistName.replace(/\s+/g, '').toLowerCase()}-${booking.clientName.replace(/\s+/g, '').toLowerCase()}`;
                              const existingMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`) || '[]');
                              const newMessage = {
                                id: Date.now().toString(),
                                sender: 'psychologist',
                                senderName: booking.psychologistName,
                                text: message.trim(),
                                timestamp: new Date().toISOString(),
                                clientName: booking.clientName
                              };
                              existingMessages.push(newMessage);
                              localStorage.setItem(`chat_${chatId}`, JSON.stringify(existingMessages));
                              alert(`✅ Сообщение отправлено ${booking.clientName}!\n\nСообщение будет доступно в личном кабинете клиента.`);
                            }
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                        >
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          Сообщение
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(`https://wa.me/${booking.clientPhone.replace(/[^0-9]/g, '')}?text=Здравствуйте! Это ваш психолог. Напоминаю о сеансе ${new Date(booking.date).toLocaleDateString('ru-RU')} в ${booking.time}`, '_blank')}
                          className="bg-green-500 hover:bg-green-600 text-white text-xs"
                        >
                          <Icon name="MessageCircle" size={14} className="mr-1" />
                          WhatsApp
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(`https://t.me/${booking.clientPhone.replace(/[^0-9]/g, '')}`, '_blank')}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                        >
                          <Icon name="Send" size={14} className="mr-1" />
                          Telegram
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(`sms:${booking.clientPhone}?body=Здравствуйте! Это ваш психолог. Напоминаю о сеансе ${new Date(booking.date).toLocaleDateString('ru-RU')} в ${booking.time}`, '_blank')}
                          className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                        >
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          SMS
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentNotifications;