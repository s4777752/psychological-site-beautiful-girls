import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ClientLoginProps {
  onLogin: (phone: string) => void;
}

const ClientLogin: React.FC<ClientLoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [loading, setLoading] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 1) return digits;
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const sendSMSCode = async () => {
    if (!phone.replace(/\D/g, '') || phone.replace(/\D/g, '').length !== 11) {
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }

    setLoading(true);
    
    // Имитация отправки SMS
    setTimeout(() => {
      const mockCode = Math.floor(1000 + Math.random() * 9000).toString();
      setSentCode(mockCode);
      setStep('code');
      setLoading(false);
      
      // В реальном приложении здесь будет API вызов для отправки SMS
      console.log(`Отправлен SMS код: ${mockCode} на номер: ${phone}`);
      alert(`В демо-режиме код: ${mockCode}`);
    }, 2000);
  };

  const verifyCode = () => {
    if (code === sentCode) {
      const cleanPhone = phone.replace(/\D/g, '');
      onLogin(cleanPhone);
    } else {
      alert('Неверный код подтверждения');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-montserrat text-secondary">
            Вход в личный кабинет
          </CardTitle>
          <p className="text-warm-600 mt-2">
            {step === 'phone' 
              ? 'Введите номер телефона для входа' 
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
                    placeholder="+7 (___) ___-__-__"
                    className="w-full pl-10 pr-4 py-3 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    maxLength={18}
                  />
                </div>
              </div>
              
              <Button 
                onClick={sendSMSCode}
                disabled={loading || !phone.replace(/\D/g, '') || phone.replace(/\D/g, '').length !== 11}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Отправляем код...
                  </>
                ) : (
                  <>
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Получить код
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-2">
                  Код подтверждения
                </label>
                <p className="text-sm text-warm-600 mb-3">
                  Код отправлен на номер {phone}
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
                    placeholder="____"
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
                Войти
              </Button>
              
              <Button 
                onClick={() => {
                  setStep('phone');
                  setCode('');
                  setSentCode('');
                }}
                variant="outline"
                className="w-full"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Изменить номер
              </Button>
            </>
          )}
          
          <div className="text-center text-sm text-warm-500 pt-4">
            <p>Нет записей к психологу?</p>
            <a href="/" className="text-primary hover:underline font-medium">
              Записаться на консультацию
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientLogin;