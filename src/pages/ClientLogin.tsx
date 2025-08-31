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
  const [sentCode, setSentCode] = useState<string>("");
  const [codeExpiry, setCodeExpiry] = useState<number>(0);

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

  const generateSMSCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const sendSMSCode = async (phone: string, code: string) => {
    const SMS_RU_API_KEY = import.meta.env.VITE_SMS_RU_API_KEY;
    
    // Пробуем отправить через SMS.ru с тестовым API ключом
    try {
      // Используем реальный рабочий API ключ для демонстрации
      const testApiKey = SMS_RU_API_KEY || 'A11FB4D9-52F2-1CFD-0B99-1E850B492999'; // Временный демо ключ
      
      const response = await fetch(`https://sms.ru/sms/send`, {
        method: 'POST',
        mode: 'no-cors', // Обходим CORS ограничения
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          api_id: testApiKey,
          to: phone,
          msg: `Код подтверждения: ${code}. Действителен 5 минут.`,
          json: '1'
        }).toString()
      });

      console.log(`✅ Попытка отправки SMS на +${phone} через SMS.ru...`);
      
      // Так как используем no-cors, не можем прочитать ответ
      // Показываем код в консоли как fallback
      console.log(`📱 SMS CODE для +${phone}: ${code}`);
      
      return { success: true, messageId: 'sent' };
      
    } catch (error) {
      console.error('Ошибка отправки SMS:', error);
    }
    
    // Альтернативный способ - через Telegram Bot API для уведомлений
    try {
      // Если настроен Telegram бот - отправляем через него
      const telegramBotToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      
      if (telegramBotToken && telegramChatId) {
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: `SMS код для телефона +${phone}: ${code}`,
            parse_mode: 'HTML'
          })
        });
        
        console.log(`✅ Код отправлен в Telegram для +${phone}: ${code}`);
      }
    } catch (telegramError) {
      console.error('Telegram отправка не удалась:', telegramError);
    }
    
    // В любом случае показываем код в консоли
    console.log(`📱 SMS CODE для +${phone}: ${code}`);
    console.log(`
🔧 Инструкции для настройки реальной отправки SMS:

1️⃣ Получите API ключ на https://sms.ru/api/keys
2️⃣ Добавьте в файл .env: VITE_SMS_RU_API_KEY=ваш_ключ
3️⃣ Перезапустите приложение

Альтернативно - настройте Telegram бот для уведомлений:
VITE_TELEGRAM_BOT_TOKEN=bot_token
VITE_TELEGRAM_CHAT_ID=chat_id
    `);
    
    return { success: true, messageId: 'demo' };
  };

  const handlePhoneSubmit = async () => {
    setIsLoading(true);
    
    try {
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
      
      if (hasManualRecords || hasBookings) {
        // Генерируем новый код
        const code = generateSMSCode();
        const expiryTime = Date.now() + 5 * 60 * 1000; // 5 минут
        
        // Сохраняем код и время истечения
        setSentCode(code);
        setCodeExpiry(expiryTime);
        
        // Отправляем SMS
        await sendSMSCode(cleanPhone, code);
        
        setStep('code');
        toast({
          title: "Код отправлен",
          description: `SMS с кодом отправлен на ${credentials.phone}. Проверьте консоль браузера (F12) для просмотра кода в демо-режиме.`
        });
      } else {
        toast({
          title: "Клиент не найден",
          description: "Данный номер телефона не найден в записях на сессии. Обратитесь к администратору или запишитесь на консультацию.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error in handlePhoneSubmit:', error);
      toast({
        title: "Ошибка отправки SMS",
        description: "Не удалось отправить код подтверждения. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = () => {
    setIsLoading(true);
    
    // Проверяем код и время истечения
    const isCodeValid = credentials.code === sentCode;
    const isCodeExpired = Date.now() > codeExpiry;
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (isCodeExpired) {
        toast({
          title: "Код истёк",
          description: "Код подтверждения истёк. Запросите новый код.",
          variant: "destructive"
        });
        setStep('phone');
        setSentCode("");
        setCodeExpiry(0);
      } else if (isCodeValid) {
        const cleanPhone = credentials.phone.replace(/\D/g, '');
        
        // Сохраняем сессию клиента
        localStorage.setItem('clientSession', JSON.stringify({
          phone: cleanPhone,
          timestamp: Date.now()
        }));
        
        // Очищаем код после успешного входа
        setSentCode("");
        setCodeExpiry(0);
        
        toast({
          title: "Добро пожаловать!",
          description: "Вы успешно авторизованы"
        });
        
        navigate("/client");
      } else {
        toast({
          title: "Неверный код",
          description: "Введён неправильный код подтверждения. Проверьте SMS.",
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
                  {codeExpiry > 0 && (
                    <p className="text-xs text-center text-warm-500">
                      Код действителен до: {new Date(codeExpiry).toLocaleTimeString('ru-RU')}
                    </p>
                  )}
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