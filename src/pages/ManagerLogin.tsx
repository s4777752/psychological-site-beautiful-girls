import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const ManagerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Проверка логина и пароля
    if (email === "s4777752@ya.ru" && password === "89024777752s") {
      // Сохраняем состояние авторизации
      localStorage.setItem("managerAuth", "true");
      navigate("/admin/manager/dashboard");
    } else {
      setError("Неверный логин или пароль");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-warm-200">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="UserCog" size={32} className="text-warm-600" />
          </div>
          <CardTitle className="text-2xl text-warm-800">Вход для управляющего</CardTitle>
          <p className="text-warm-600">Введите данные для доступа к панели управления</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="s4777752@ya.ru"
                required
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-warm-600 hover:bg-warm-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" className="mr-2" size={16} />
                  Войти
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 pt-4 border-t border-warm-200">
            <Button 
              variant="outline"
              onClick={() => navigate('/admin')}
              className="w-full text-warm-600 border-warm-300 hover:bg-warm-100"
            >
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад к меню
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerLogin;