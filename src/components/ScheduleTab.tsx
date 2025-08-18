import { useState } from "react";
import ScheduleManager from "@/components/ScheduleManager";

interface PsychologistAuth {
  id: string;
  name: string;
  login: string;
}

const ScheduleTab = () => {
  const [psychologist] = useState<PsychologistAuth | null>(() => {
    const auth = localStorage.getItem("psychologistAuth");
    return auth ? JSON.parse(auth) : null;
  });

  return (
    <div className="space-y-6">
      <ScheduleManager psychologistName={psychologist?.name || "Психолог"} />
    </div>
  );
};

export default ScheduleTab;