import Icon from "@/components/ui/icon";

interface Tab {
  id: string;
  name: string;
  icon: string;
}

interface ManagerTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ManagerTabs = ({ activeTab, onTabChange }: ManagerTabsProps) => {
  const tabs: Tab[] = [
    { id: "overview", name: "Обзор", icon: "BarChart3" },
    { id: "sessions", name: "Записи", icon: "Calendar" },
    { id: "payments", name: "Уведомления", icon: "Bell" },
    { id: "financial", name: "Финансы", icon: "DollarSign" },
    { id: "content", name: "Контент", icon: "FileText" },
    { id: "psychologists", name: "Психологи", icon: "Users" },
    { id: "settings", name: "Настройки", icon: "Settings" }
  ];

  return (
    <div className="mb-8">
      <div className="border-b border-warm-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? "border-warm-500 text-warm-600"
                  : "border-transparent text-warm-500 hover:text-warm-700 hover:border-warm-300"
              }`}
            >
              <Icon name={tab.icon as any} className="mr-2" size={16} />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ManagerTabs;