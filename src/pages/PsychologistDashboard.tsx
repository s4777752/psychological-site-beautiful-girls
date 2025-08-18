import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTabs from "@/components/DashboardTabs";
import OverviewTab from "@/components/OverviewTab";
import ClientsTab from "@/components/ClientsTab";
import MessagesTab from "@/components/MessagesTab";
import ScheduleTab from "@/components/ScheduleTab";
import RecordsTab from "@/components/RecordsTab";
import ProfileTab from "@/components/ProfileTab";

interface PsychologistAuth {
  id: string;
  name: string;
  login: string;
}

const PsychologistDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [psychologist, setPsychologist] = useState<PsychologistAuth | null>(null);

  useEffect(() => {
    // Проверяем авторизацию
    const auth = localStorage.getItem("psychologistAuth");
    if (!auth) {
      navigate("/admin/psychologist");
    } else {
      setPsychologist(JSON.parse(auth));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("psychologistAuth");
    navigate("/admin");
  };

  if (!psychologist) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "clients":
        return <ClientsTab />;
      case "messages":
        return <MessagesTab />;
      case "schedule":
        return <ScheduleTab />;
      case "records":
        return <RecordsTab />;
      case "profile":
        return <ProfileTab psychologist={psychologist} />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <DashboardHeader 
        psychologistName={psychologist.name}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {renderTabContent()}
      </div>
    </div>
  );
};

export default PsychologistDashboard;