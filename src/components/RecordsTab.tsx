import { useState } from "react";
import PaymentNotifications from "@/components/PaymentNotifications";

interface PsychologistAuth {
  id: string;
  name: string;
  login: string;
}

const RecordsTab = () => {
  const [psychologist] = useState<PsychologistAuth | null>(() => {
    const auth = localStorage.getItem("psychologistAuth");
    return auth ? JSON.parse(auth) : null;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Записи на сессии</h2>
      <PaymentNotifications userRole="psychologist" psychologistName={psychologist?.name} />
    </div>
  );
};

export default RecordsTab;