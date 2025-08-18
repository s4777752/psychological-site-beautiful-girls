import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ManagerHeaderProps {
  onViewSite: () => void;
  onLogout: () => void;
}

const ManagerHeader = ({ onViewSite, onLogout }: ManagerHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Icon name="UserCog" className="text-warm-600 mr-3" size={24} />
            <h1 className="text-xl font-bold text-warm-800">Панель управляющего</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              onClick={onViewSite}
              className="text-warm-600 border-warm-300 hover:bg-warm-100"
            >
              <Icon name="Eye" className="mr-2" size={16} />
              Просмотр сайта
            </Button>
            <Button 
              variant="outline"
              onClick={onLogout}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Icon name="LogOut" className="mr-2" size={16} />
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ManagerHeader;