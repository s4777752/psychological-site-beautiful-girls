import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ClientAuthProps {
  onLogin: (phone: string) => void;
}

const ClientAuth: React.FC<ClientAuthProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);
  const [sentCode] = useState('1234'); // В реальном приложении будет генерироваться

  // Нормализация номера телефона
  const normalizePhone = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return cleaned.startsWith('8') ? '7' + cleaned.slice(1) : cleaned;
  };

  // Форматирование номера для отображения
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 1) return digits;
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  // Проверка номера в записях
  const checkPhoneInRecords = (inputPhone: string): boolean => {
    const normalizedInput = normalizePhone(inputPhone);
    
    // Получаем записи из localStorage
    const manualRecords = JSON.parse(localStorage.getItem('manualRecords') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Проверяем ручные записи
    const foundInManual = manualRecords.some((record: any) => {
      if (!record.clientPhone) return false;
      const recordPhone = normalizePhone(record.clientPhone);
      return recordPhone === normalizedInput;
    });
    
    // Проверяем автоматические записи
    const foundInBookings = bookings.some((booking: any) => {
      if (!booking.clientPhone) return false;
      const bookingPhone = normalizePhone(booking.clientPhone);
      return bookingPhone === normalizedInput;
    });
    
    return foundInManual || foundInBookings;
  };

  // Отправка SMS кода
  const sendSMS = () => {
    if (!phone || phone.replace(/\D/g, '').length !== 11) {
      alert('Введите корректный номер телефона');
      return;
    }

    setLoading(true);

    // Проверяем номер в записях
    if (!checkPhoneInRecords(phone)) {
      setLoading(false);
      alert('Номер телефона не найден в записях. Обратитесь к психологу для записи на консультацию.');
      return;
    }

    // Имитация отправки SMS
    setTimeout(() => {
      setStep('code');
      setLoading(false);
      alert(`Демо: SMS код отправлен. Используйте код: ${sentCode}`);
    }, 1500);
  };

  // Проверка кода
  const verifyCode = () => {
    if (code === sentCode) {
      const cleanPhone = normalizePhone(phone);
      onLogin(cleanPhone);
    } else {
      alert('Неверный код. В демо режиме используйте: 1234');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-montserrat text-secondary">
            Личный кабинет клиента
          </CardTitle>
          <p className="text-warm-600 mt-2">
            {step === 'phone' 
              ? 'Введите номер телефона из записи к психологу' 
              : 'Введите код из SMS'
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === 'phone' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Номер телефона
                </label>
                <div className="relative">
                  <Icon 
                    name="Phone" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-400"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="+7 (918) 108-97-71"
                    className="w-full pl-10 pr-4 py-3 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    maxLength={18}
                  />
                </div>
                <p className="text-xs text-warm-500 mt-1">
                  Используйте номер, указанный при записи к психологу
                </p>
              </div>
              
              <Button 
                onClick={sendSMS}
                disabled={loading || !phone || phone.replace(/\D/g, '').length !== 11}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Проверяем номер...
                  </>
                ) : (
                  <>
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Получить SMS код
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Код из SMS
                </label>
                <p className="text-sm text-warm-600 mb-3">
                  Код отправлен на {phone}
                </p>
                <div className="relative">
                  <Icon 
                    name="Shield" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-400"
                  />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="1234"
                    className="w-full pl-10 pr-4 py-3 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl font-mono tracking-widest"
                    maxLength={4}
                  />
                </div>
              </div>
              
              <Button 
                onClick={verifyCode}
                disabled={code.length !== 4}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3"
              >
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти в кабинет
              </Button>
              
              <Button 
                onClick={() => {
                  setStep('phone');
                  setCode('');
                }}
                variant="outline"
                className="w-full"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Изменить номер
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientAuth;