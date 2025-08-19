import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import IncomingCallNotification from "@/components/IncomingCallNotification";
import VideoCall from "@/components/VideoCall";
import ChatInterface from "@/components/ChatInterface";
import ClientHeader from "@/components/client/ClientHeader";
import QuickInfoCards from "@/components/client/QuickInfoCards";
import TabNavigation from "@/components/client/TabNavigation";
import SessionsTab from "@/components/client/SessionsTab";
import PaymentsTab from "@/components/client/PaymentsTab";
import VideoTab from "@/components/client/VideoTab";
import ProfileTab from "@/components/client/ProfileTab";

interface ClientAuth {
  id: string;
  name: string;
  phone: string;
  psychologist: string;
  nextSession: string;
}

interface Session {
  id: string;
  date: string;
  time: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  notes?: string;
  psychologist: string;
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentId?: string;
}

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [client, setClient] = useState<ClientAuth | null>(null);
  const [activeTab, setActiveTab] = useState("sessions");
  const [incomingCall, setIncomingCall] = useState<{
    show: boolean;
    callerName: string;
    roomId: string;
  }>({ show: false, callerName: "", roomId: "" });
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("clientAuth");
    if (!auth) {
      navigate("/client/login");
    } else {
      setClient(JSON.parse(auth));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("clientAuth");
    navigate("/");
  };

  const handleAcceptCall = () => {
    setCurrentRoomId(incomingCall.roomId);
    setIsInVideoCall(true);
    setIncomingCall({ show: false, callerName: "", roomId: "" });
  };

  const handleDeclineCall = () => {
    setIncomingCall({ show: false, callerName: "", roomId: "" });
    toast({
      title: "Звонок отклонен",
      description: "Вы отклонили входящий видеозвонок"
    });
  };

  const handleEndCall = () => {
    setIsInVideoCall(false);
    setCurrentRoomId("");
  };

  if (!client) {
    return null;
  }

  if (isInVideoCall) {
    return (
      <VideoCall
        roomId={currentRoomId}
        userType="client"
        userName={client.name}
        onEndCall={handleEndCall}
      />
    );
  }

  const sessions: Session[] = [
    {
      id: "1",
      date: "2025-08-16",
      time: "10:00",
      status: "upcoming",
      psychologist: client.psychologist,
      notes: "Плановая консультация",
      amount: 2500,
      paymentStatus: "paid",
      paymentId: "PAY_12345"
    },
    {
      id: "2",
      date: "2025-08-14",
      time: "10:00",
      status: "completed",
      psychologist: client.psychologist,
      notes: "Работа с тревожностью - хорошие результаты",
      amount: 2500,
      paymentStatus: "paid",
      paymentId: "PAY_12344"
    },
    {
      id: "3",
      date: "2025-08-21",
      time: "10:00",
      status: "upcoming",
      psychologist: client.psychologist,
      amount: 2500,
      paymentStatus: "pending"
    },
    {
      id: "4",
      date: "2025-08-12",
      time: "15:00",
      status: "completed",
      psychologist: client.psychologist,
      notes: "Первичная консультация",
      amount: 2500,
      paymentStatus: "paid",
      paymentId: "PAY_12342"
    },
    {
      id: "5",
      date: "2025-08-19",
      time: "14:00",
      status: "cancelled",
      psychologist: client.psychologist,
      notes: "Отменено клиентом",
      amount: 2500,
      paymentStatus: "refunded",
      paymentId: "PAY_12346"
    }
  ];

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const nextSession = upcomingSessions[0];

  const tabs = [
    { id: "sessions", name: "Сеансы", icon: "Calendar" },
    { id: "payments", name: "Платежи", icon: "CreditCard" },
    { id: "messages", name: "Сообщения", icon: "MessageSquare" },
    { id: "video", name: "Видеозвонок", icon: "Video" },
    { id: "profile", name: "Профиль", icon: "User" }
  ];

  return (
    <div className="min-h-screen bg-warm-50">
      <ClientHeader 
        client={client} 
        onNavigateHome={() => navigate('/')}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuickInfoCards 
          client={client} 
          sessions={sessions} 
          nextSession={nextSession} 
        />

        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        {activeTab === "sessions" && <SessionsTab sessions={sessions} />}
        {activeTab === "payments" && <PaymentsTab sessions={sessions} />}
        {activeTab === "messages" && (
          <ChatInterface 
            userType="client" 
            recipientName={client.psychologist}
          />
        )}
        {activeTab === "video" && <VideoTab nextSession={nextSession} />}
        {activeTab === "profile" && <ProfileTab client={client} />}
      </div>

      {/* Incoming Call Notification */}
      <IncomingCallNotification
        show={incomingCall.show}
        callerName={incomingCall.callerName}
        roomId={incomingCall.roomId}
        onAccept={handleAcceptCall}
        onDecline={handleDeclineCall}
      />
    </div>
  );
};

export default ClientDashboard;