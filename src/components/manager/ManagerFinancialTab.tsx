import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import PsychologistCard from "./PsychologistCard";
import PayoutModal from "./PayoutModal";
import DetailReportModal from "./DetailReportModal";
import ClientsReport from "./ClientsReport";
import OverviewReport from "./OverviewReport";

interface ClientData {
  id: number;
  name: string;
  email: string;
  totalSessions: number;
  totalPaid: number;
  lastSession: string;
  status: string;
  averageRating: number;
}

interface PsychologistData {
  id: number;
  name: string;
  email: string;
  totalSessions: number;
  totalEarned: number;
  commission: number;
  lastSession: string;
  rating: number;
  clientsCount: number;
}

const ManagerFinancialTab = () => {
  const [reportType, setReportType] = useState("overview");
  const [dateRange, setDateRange] = useState("all");
  const [selectedPsychologist, setSelectedPsychologist] = useState<PsychologistData | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const clientsData: ClientData[] = [
    {
      id: 1,
      name: "Анна Иванова",
      email: "anna@example.com",
      totalSessions: 8,
      totalPaid: 20000,
      lastSession: "2024-08-15",
      status: "active",
      averageRating: 4.8
    },
    {
      id: 2,
      name: "Сергей Петров",
      email: "sergey@example.com",
      totalSessions: 12,
      totalPaid: 30000,
      lastSession: "2024-08-16",
      status: "active",
      averageRating: 4.9
    },
    {
      id: 3,
      name: "Елена Козлова",
      email: "elena@example.com",
      totalSessions: 5,
      totalPaid: 12500,
      lastSession: "2024-08-10",
      status: "inactive",
      averageRating: 4.7
    },
    {
      id: 4,
      name: "Дмитрий Орлов",
      email: "dmitry@example.com",
      totalSessions: 15,
      totalPaid: 37500,
      lastSession: "2024-08-16",
      status: "active",
      averageRating: 5.0
    }
  ];

  const getUpdatedPsychologistData = () => {
    const payoutFlag = localStorage.getItem('mariaPayout');
    if (payoutFlag) {
      return {
        id: 1,
        name: "Мария Козлова",
        email: "maria@example.com",
        totalSessions: 0,
        totalEarned: 0,
        commission: 0,
        lastSession: "2024-08-16",
        rating: 4.8,
        clientsCount: 18
      };
    }
    return {
      id: 1,
      name: "Мария Козлова",
      email: "maria@example.com",
      totalSessions: 45,
      totalEarned: 112500,
      commission: 50625,
      lastSession: "2024-08-16",
      rating: 4.8,
      clientsCount: 18
    };
  };

  const psychologistsData: PsychologistData[] = [
    getUpdatedPsychologistData(),
    {
      id: 2,
      name: "Анна Смирнова",
      email: "anna.smirnova@example.com",
      totalSessions: 38,
      totalEarned: 95000,
      commission: 42750,
      lastSession: "2024-08-16",
      rating: 4.9,
      clientsCount: 15
    },
    {
      id: 3,
      name: "Елена Волкова",
      email: "elena.volkova@example.com",
      totalSessions: 32,
      totalEarned: 80000,
      commission: 36000,
      lastSession: "2024-08-15",
      rating: 4.7,
      clientsCount: 12
    },
    {
      id: 4,
      name: "Дарья Петрова",
      email: "darya@example.com",
      totalSessions: 28,
      totalEarned: 70000,
      commission: 31500,
      lastSession: "2024-08-16",
      rating: 4.6,
      clientsCount: 11
    }
  ];

  const totalRevenue = clientsData.reduce((sum, client) => sum + client.totalPaid, 0);
  const totalCommissions = psychologistsData.reduce((sum, psychologist) => sum + psychologist.commission, 0);
  const platformRevenue = totalRevenue - totalCommissions;

  const handleDetailedReport = (psychologist: PsychologistData) => {
    setSelectedPsychologist(psychologist);
    setShowDetailModal(true);
  };

  const handlePayout = (psychologist: PsychologistData) => {
    setSelectedPsychologist(psychologist);
    setShowPayoutModal(true);
  };

  const handlePayoutConfirm = () => {
    if (selectedPsychologist) {
      const payoutRecord = {
        id: `payout_${Date.now()}`,
        psychologistName: selectedPsychologist.name,
        psychologistEmail: selectedPsychologist.email,
        amount: selectedPsychologist.commission,
        totalSessions: selectedPsychologist.totalSessions,
        payoutDate: new Date().toISOString().split('T')[0],
        period: `Август 2025`,
        status: 'completed' as const,
        paymentMethod: 'Банковский перевод',
        transactionId: `TXN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      const existingArchive = localStorage.getItem('payoutArchive');
      const archive = existingArchive ? JSON.parse(existingArchive) : [];
      archive.push(payoutRecord);
      localStorage.setItem('payoutArchive', JSON.stringify(archive));

      if (selectedPsychologist.name === "Мария Козлова") {
        localStorage.setItem('mariaPayout', 'true');
      }

      alert(
        `✅ Выплата успешно завершена!\n\n` +
        `Психолог: ${selectedPsychologist.name}\n` +
        `Сумма: ₽${selectedPsychologist.commission.toLocaleString()}\n` +
        `ID транзакции: ${payoutRecord.transactionId}\n\n` +
        `📋 Данные сохранены в архиве\n` +
        `🔄 Показатели психолога обнулены`
      );

      setShowPayoutModal(false);
      setSelectedPsychologist(null);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleClientReport = (client: ClientData) => {
    setSelectedClient(client);
    setShowClientModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Финансовые отчёты</h2>
        <div className="flex space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-warm-300 rounded-md focus:border-warm-500"
          >
            <option value="all">За всё время</option>
            <option value="month">За месяц</option>
            <option value="week">За неделю</option>
            <option value="today">За сегодня</option>
          </select>
          <Button 
            className="bg-warm-600 hover:bg-warm-700"
            onClick={() => {
              alert("Экспорт отчёта в PDF/Excel (функция в разработке)");
            }}
          >
            <Icon name="Download" className="mr-2" size={16} />
            Экспорт отчёта
          </Button>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₽{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Общий доход</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">₽{totalCommissions.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Выплачено психологам</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">₽{platformRevenue.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Доход платформы</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {psychologistsData.reduce((sum, p) => sum + p.totalSessions, 0)}
            </div>
            <p className="text-sm text-warm-600">Всего сеансов</p>
          </CardContent>
        </Card>
      </div>

      {/* Переключатель между отчётами */}
      <div className="flex space-x-4">
        <Button
          variant={reportType === "overview" ? "default" : "outline"}
          onClick={() => setReportType("overview")}
          className={reportType === "overview" ? "bg-warm-600 hover:bg-warm-700" : "border-warm-300 text-warm-600 hover:bg-warm-100"}
        >
          <Icon name="BarChart3" className="mr-2" size={16} />
          Общий обзор
        </Button>
        <Button
          variant={reportType === "clients" ? "default" : "outline"}
          onClick={() => setReportType("clients")}
          className={reportType === "clients" ? "bg-warm-600 hover:bg-warm-700" : "border-warm-300 text-warm-600 hover:bg-warm-100"}
        >
          <Icon name="Users" className="mr-2" size={16} />
          По клиентам
        </Button>
        <Button
          variant={reportType === "psychologists" ? "default" : "outline"}
          onClick={() => setReportType("psychologists")}
          className={reportType === "psychologists" ? "bg-warm-600 hover:bg-warm-700" : "border-warm-300 text-warm-600 hover:bg-warm-100"}
        >
          <Icon name="UserCheck" className="mr-2" size={16} />
          По психологам
        </Button>
      </div>

      {/* Отчёт по клиентам */}
      {reportType === "clients" && (
        <ClientsReport clients={clientsData} onClientReport={handleClientReport} />
      )}

      {/* Отчёт по психологам */}
      {reportType === "psychologists" && (
        <Card className="border-warm-200">
          <CardContent>
            <div className="space-y-4 mt-6">
              {psychologistsData.map((psychologist) => (
                <PsychologistCard
                  key={psychologist.id}
                  psychologist={psychologist}
                  onDetailedReport={handleDetailedReport}
                  onPayout={handlePayout}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Общий обзор */}
      {reportType === "overview" && (
        <OverviewReport clients={clientsData} psychologists={psychologistsData} />
      )}

      {/* Модальные окна */}
      <DetailReportModal
        psychologist={showDetailModal ? selectedPsychologist : undefined}
        client={showClientModal ? selectedClient : undefined}
        isOpen={showDetailModal || showClientModal}
        onClose={() => {
          setShowDetailModal(false);
          setShowClientModal(false);
          setSelectedPsychologist(null);
          setSelectedClient(null);
        }}
      />

      <PayoutModal
        psychologist={selectedPsychologist!}
        isOpen={showPayoutModal}
        onClose={() => {
          setShowPayoutModal(false);
          setSelectedPsychologist(null);
        }}
        onConfirm={handlePayoutConfirm}
      />
    </div>
  );
};

export default ManagerFinancialTab;