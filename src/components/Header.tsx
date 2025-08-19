import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Icon name="Heart" className="text-primary" size={32} />
            <span className="text-2xl font-montserrat font-bold text-secondary">MindCare</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-secondary hover:text-primary transition-colors">Главная</a>
            <a href="#psychologists" className="text-secondary hover:text-primary transition-colors">Психологи</a>
            <a href="#services" className="text-secondary hover:text-primary transition-colors">Услуги</a>
            <a href="#booking" className="text-secondary hover:text-primary transition-colors">Запись</a>
            <a href="#reviews" className="text-secondary hover:text-primary transition-colors">Отзывы</a>
            <a href="#contacts" className="text-secondary hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex space-x-2">
            <Button 
              onClick={() => navigate('/client/login')}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Icon name="User" className="mr-2" size={16} />
              Войти как клиент
            </Button>
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => navigate('/client/login')}
            >
              Записаться
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;