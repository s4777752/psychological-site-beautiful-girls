import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { authenticateClient, initializeDemoClients } from "@/utils/clientStorage";

const ClientLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    phone: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // Инициализируем демо-клиентов при загрузке компонента
  useEffect(() => {
    initializeDemoClients();
    
    // Проверяем, не авторизован ли уже пользователь
    const session = localStorage.getItem("clientSession");
    if (session) {
      try {
        const { timestamp } = JSON.parse(session);
        // Если сессия не старше 24 часов, перенаправляем в дашборд
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          navigate("/client/dashboard");
          return;
        } else {
          localStorage.removeItem('clientSession');
        }
      } catch (error) {
        localStorage.removeItem('clientSession');
      }
    }
  }, [navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Попытка авторизации:', credentials);
      const result = authenticateClient(credentials.phone, credentials.password);
      console.log('Результат авторизации:', result);
      
      if (result.success && result.client) {
        // Сохраняем сессию клиента
        const sessionData = {
          id: result.client.id,
          phone: result.client.phone,
          name: result.client.name,
          timestamp: Date.now()
        };
        
        console.log('Сохраняем сессию:', sessionData);
        localStorage.setItem('clientSession', JSON.stringify(sessionData));
        
        toast({
          title: "Добро пожаловать!",
          description: `Вы успешно вошли в систему, ${result.client.name}`
        });
        
        console.log('Перенаправляем на dashboard');
        navigate("/client/dashboard");
      } else {
        console.log('Ошибка авторизации:', result.error);
        toast({
          title: "Ошибка авторизации",
          description: result.error || "Неверные данные для входа",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при авторизации. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setCredentials({ ...credentials, phone: formatted });
  };

  const isFormValid = credentials.phone.replace(/\D/g, '').length >= 11 && credentials.password.length >= 1;

  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="User" size={32} className="text-warm-600" />
          </div>
          <h1 className="text-2xl font-bold text-warm-800 mb-2">Вход для клиентов</h1>
          <p className="text-warm-600">
            Введите ваш номер телефона и пароль для входа в личный кабинет
          </p>
        </div>

        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle className="text-center text-warm-800">
              Авторизация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={credentials.phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (999) 123-45-67"
                  className="border-warm-300 focus:border-warm-500 text-base sm:text-sm h-12 sm:h-10"
                  maxLength={18}
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Введите пароль"
                  className="border-warm-300 focus:border-warm-500 text-base sm:text-sm h-12 sm:h-10"
                  autoComplete="current-password"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full bg-warm-600 hover:bg-warm-700 h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                    Проверяем данные...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" className="mr-2" size={16} />
                    Войти
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo accounts info */}
        <Card className="mt-6 border-warm-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-warm-800 mb-3 text-center">Демо-аккаунты для тестирования:</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-warm-50 p-3 rounded border">
                <p className="font-medium text-warm-700">Анна Петрова</p>
                <p className="text-warm-600">Телефон: +7 (999) 123-45-67</p>
                <p className="text-warm-600">Пароль: anna123</p>
              </div>
              <div className="bg-warm-50 p-3 rounded border">
                <p className="font-medium text-warm-700">Михаил Сидоров</p>
                <p className="text-warm-600">Телефон: +7 (999) 987-65-43</p>
                <p className="text-warm-600">Пароль: mikhail456</p>
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