import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-warm-800">Администрация</h1>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="text-warm-600 border-warm-300 hover:bg-warm-100"
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            На главную
          </Button>
        </div>

        {/* Admin Menu */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow border-warm-200">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="UserCog" size={32} className="text-warm-600" />
              </div>
              <CardTitle className="text-xl text-warm-800">Управляющий</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-warm-600 mb-6">
                Управление персоналом, расписанием и общими настройками клиники
              </p>
              <Button 
                className="w-full bg-warm-600 hover:bg-warm-700"
                onClick={() => navigate('/admin/manager')}
              >
                <Icon name="Settings" className="mr-2" size={16} />
                Войти как управляющий
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-warm-200">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-warm-600" />
              </div>
              <CardTitle className="text-xl text-warm-800">Психологи</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-warm-600 mb-6">
                Личный кабинет психолога для работы с клиентами и расписанием
              </p>
              <Button 
                className="w-full bg-warm-600 hover:bg-warm-700"
                onClick={() => navigate('/admin/psychologist')}
              >
                <Icon name="Heart" className="mr-2" size={16} />
                Войти как психолог
              </Button>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default Admin;