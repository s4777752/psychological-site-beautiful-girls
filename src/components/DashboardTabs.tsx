import Icon from "@/components/ui/icon";

interface Tab {
  id: string;
  name: string;
  icon: string;
}

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const DashboardTabs = ({ activeTab, onTabChange }: DashboardTabsProps) => {
  // Проверяем наличие активных слотов в расписании
  const hasActiveSlots = () => {
    const schedule = localStorage.getItem('psychologistSchedule');
    if (!schedule) return false;
    
    try {
      const scheduleData = JSON.parse(schedule);
      return Object.values(scheduleData).some((slots: any) => 
        Array.isArray(slots) && slots.some((slot: any) => slot.available)
      );
    } catch {
      return false;
    }
  };

  const tabs: Tab[] = [
    { id: "overview", name: "Обзор", icon: "BarChart3" },
    { id: "clients", name: "Клиенты", icon: "Users" },
    { id: "messages", name: "Сообщения", icon: "MessageSquare" },
    { id: "schedule", name: hasActiveSlots() ? "Расписание +" : "Расписание", icon: "Calendar" },
    { id: "records", name: "Записи", icon: "FileText" },
    { id: "documents", name: "Документы", icon: "FolderOpen" },
    { id: "profile", name: "Профиль", icon: "User" }
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

export default DashboardTabs;