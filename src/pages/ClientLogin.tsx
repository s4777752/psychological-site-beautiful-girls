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

  // В реальной системе здесь будет интеграция с API

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+7 (${digits}`;
    if (digits.length <= 4) return `+7 (${digits.slice(1, 4)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const handlePhoneSubmit = () => {
    setIsLoading(true);
    
    // В реальной системе здесь будет запрос к API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Функция временно недоступна",
        description: "Авторизация клиентов в разработке. Обратитесь к администратору.",
        variant: "destructive"
      });
    }, 1500);
  };

  const handleCodeSubmit = () => {
    setIsLoading(true);
    
    // В реальной системе здесь будет проверка кода через API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Функция временно недоступна",
        description: "Авторизация клиентов в разработке. Обратитесь к администратору.",
        variant: "destructive"
      });
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

        {/* Информационный блок */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Info" size={16} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800 mb-1">Функция в разработке</h3>
              <p className="text-sm text-blue-700">
                Авторизация клиентов находится в стадии разработки. 
                Для доступа к личному кабинету обратитесь к вашему психологу.
              </p>
            </div>
          </div>
        </div>

        <Card className="border-warm-200 opacity-60">
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
                    className="border-gray-300 bg-gray-100"
                    maxLength={18}
                    disabled={true}
                  />
                </div>
                
                <Button 
                  onClick={handlePhoneSubmit}
                  disabled={true}
                  className="w-full bg-gray-400 cursor-not-allowed"
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
                    className="border-gray-300 bg-gray-100 text-center text-xl tracking-wider"
                    maxLength={4}
                    disabled={true}
                  />
                </div>
                
                <Button 
                  onClick={handleCodeSubmit}
                  disabled={true}
                  className="w-full bg-gray-400 cursor-not-allowed"
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

        {/* Demo info */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" className="text-blue-600 mt-0.5" size={16} />
              <div>
                <p className="text-sm font-medium text-blue-800 mb-2">Демо-доступ:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>📱 +7 (999) 123-45-67 → код: 1234</div>
                  <div>📱 +7 (999) 987-65-43 → код: 5678</div>
                </div>
              </div>
            </div>
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