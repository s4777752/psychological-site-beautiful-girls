import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerHeader from "@/components/manager/ManagerHeader";
import ManagerTabs from "@/components/manager/ManagerTabs";
import ManagerOverviewTab from "@/components/manager/ManagerOverviewTab";
import ManagerSessionsTab from "@/components/manager/ManagerSessionsTab";
import ManagerPaymentsTab from "@/components/manager/ManagerPaymentsTab";
import ManagerFinancialTab from "@/components/manager/ManagerFinancialTab";
import ManagerArchiveTab from "@/components/manager/ManagerArchiveTab";
import ManagerContentTab from "@/components/manager/ManagerContentTab";
import ManagerPsychologistsTab from "@/components/manager/ManagerPsychologistsTab";
import ManagerSettingsTab from "@/components/manager/ManagerSettingsTab";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const isAuth = localStorage.getItem("managerAuth");
    if (!isAuth) {
      navigate("/admin/manager");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("managerAuth");
    navigate("/admin");
  };

  const handleViewSite = () => {
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ManagerOverviewTab />;
      case "sessions":
        return <ManagerSessionsTab />;
      case "payments":
        return <ManagerPaymentsTab />;
      case "financial":
        return <ManagerFinancialTab />;
      case "archive":
        return <ManagerArchiveTab />;
      case "content":
        return <ManagerContentTab />;
      case "psychologists":
        return <ManagerPsychologistsTab />;
      case "settings":
        return <ManagerSettingsTab />;
      default:
        return <ManagerOverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <ManagerHeader 
        onViewSite={handleViewSite}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ManagerTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {renderTabContent()}
      </div>
    </div>
  );
};

export default ManagerDashboard;