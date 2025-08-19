import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ClientAuth {
  id: string;
  name: string;
  phone: string;
  psychologist: string;
  nextSession: string;
}

interface ClientHeaderProps {
  client: ClientAuth;
  onNavigateHome: () => void;
  onLogout: () => void;
}

const ClientHeader = ({ client, onNavigateHome, onLogout }: ClientHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Icon name="User" className="text-warm-600 mr-3" size={24} />
            <div>
              <h1 className="text-xl font-bold text-warm-800">Личный кабинет</h1>
              <p className="text-sm text-warm-600">Добро пожаловать, {client.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              onClick={onNavigateHome}
              className="text-warm-600 border-warm-300 hover:bg-warm-100"
            >
              <Icon name="Home" className="mr-2" size={16} />
              На главную
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

export default ClientHeader;