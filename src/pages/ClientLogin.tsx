import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClientLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    phone: "",
    code: ""
  });
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  // Демо-данные клиентов
  const demoClients = [
    {
      id: "1",
      name: "Анна Петрова",
      phone: "+7 (999) 123-45-67",
      code: "1234",
      psychologist: "Елена Козлова",
      nextSession: "2025-08-16 10:00"
    },
    {
      id: "2", 
      name: "Михаил Сидоров",
      phone: "+7 (999) 987-65-43",
      code: "5678",
      psychologist: "Дмитрий Петров",
      nextSession: "2025-08-16 14:00"
    }
  ];

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    
    // Если начинается с 8, заменяем на 7
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }
    
    // Если начинается с 7, добавляем как есть
    // Если начинается с другой цифры (9), добавляем 7 в начало
    if (!digits.startsWith('7') && digits.length > 0) {
      digits = '7' + digits;
    }
    
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+${digits}`;
    if (digits.length <= 4) return `+${digits.slice(0, 1)} (${digits.slice(1)}`;
    if (digits.length <= 7) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const handlePhoneSubmit = () => {
    setIsLoading(true);
    
    // Проверяем, есть ли записи с таким номером телефона
    const cleanPhone = credentials.phone.replace(/\D/g, '');
    const manualRecords = JSON.parse(localStorage.getItem('manualRecords') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    const hasManualRecords = manualRecords.some((record: any) => {
      if (!record.clientPhone) return false;
      const recordPhone = record.clientPhone.replace(/\D/g, '');
      const normalizedRecordPhone = recordPhone.startsWith('8') ? '7' + recordPhone.slice(1) : recordPhone;
      const normalizedCleanPhone = cleanPhone.startsWith('8') ? '7' + cleanPhone.slice(1) : cleanPhone;
      return normalizedRecordPhone === normalizedCleanPhone;
    });
    
    const hasBookings = bookings.some((booking: any) => {
      if (!booking.clientPhone) return false;
      const bookingPhone = booking.clientPhone.replace(/\D/g, '');
      const normalizedBookingPhone = bookingPhone.startsWith('8') ? '7' + bookingPhone.slice(1) : bookingPhone;
      const normalizedCleanPhone = cleanPhone.startsWith('8') ? '7' + cleanPhone.slice(1) : cleanPhone;
      return normalizedBookingPhone === normalizedCleanPhone;
    });
    
    setTimeout(() => {
      setIsLoading(false);
      if (hasManualRecords || hasBookings) {
        setStep('code');
        toast({
          title: "Код отправлен",
          description: `SMS с кодом отправлен на ${credentials.phone}`
        });
      } else {
        toast({
          title: "Клиент не найден",
          description: "Данный номер телефона не найден в записях на сессии. Обратитесь к администратору или запишитесь на консультацию.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleCodeSubmit = () => {
    setIsLoading(true);
    
    // В демо-режиме используем код 1234
    const isCodeValid = credentials.code === '1234';
    
    setTimeout(() => {
      setIsLoading(false);
      if (isCodeValid) {
        const cleanPhone = credentials.phone.replace(/\D/g, '');
        
        // Сохраняем сессию клиента
        localStorage.setItem('clientSession', JSON.stringify({
          phone: cleanPhone,
          timestamp: Date.now()
        }));
        
        toast({
          title: "Добро пожаловать!",
          description: "Вы успешно авторизованы"
        });
        
        navigate("/client");
      } else {
        toast({
          title: "Неверный код",
          description: "В демо-режиме используйте код: 1234",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setCredentials({ ...credentials, phone: formatted });
  };

  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="User" size={32} className="text-warm-600" />
          </div>
          <h1 className="text-2xl font-bold text-warm-800 mb-2">Вход для клиентов</h1>
          <p className="text-warm-600">
            {step === 'phone' 
              ? 'Введите номер телефона для входа в личный кабинет'
              : 'Введите код из SMS для подтверждения'
            }
          </p>
        </div>

        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle className="text-center text-warm-800">
              {step === 'phone' ? 'Номер телефона' : 'Код подтверждения'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'phone' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={credentials.phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (999) 123-45-67"
                    className="border-warm-300 focus:border-warm-500"
                    maxLength={18}
                  />
                </div>
                
                <Button 
                  onClick={handlePhoneSubmit}
                  disabled={credentials.phone.replace(/\D/g, '').length < 11 || isLoading}
                  className="w-full bg-warm-600 hover:bg-warm-700"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                      Отправляем код...
                    </>
                  ) : (
                    <>
                      <Icon name="MessageSquare" className="mr-2" size={16} />
                      Получить код
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Код из SMS</Label>
                  <Input
                    id="code"
                    type="text"
                    value={credentials.code}
                    onChange={(e) => setCredentials({ ...credentials, code: e.target.value })}
                    placeholder="0000"
                    className="border-warm-300 focus:border-warm-500 text-center text-xl tracking-wider"
                    maxLength={4}
                  />
                </div>
                
                <Button 
                  onClick={handleCodeSubmit}
                  disabled={credentials.code.length < 4 || isLoading}
                  className="w-full bg-warm-600 hover:bg-warm-700"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                      Проверяем...
                    </>
                  ) : (
                    <>
                      <Icon name="LogIn" className="mr-2" size={16} />
                      Войти
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setStep('phone')}
                  className="w-full text-warm-600 border-warm-300"
                >
                  <Icon name="ArrowLeft" className="mr-2" size={16} />
                  Изменить номер
                </Button>
              </div>
            )}
          </CardContent>
        </Card>



        {/* Back to main */}
        <div className="mt-6 text-center">
          <Button 
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-warm-600 hover:bg-warm-100"
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            На главную страницу
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;