import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface OverviewReportProps {
  clients: ClientData[];
  psychologists: PsychologistData[];
}

const OverviewReport = ({ clients, psychologists }: OverviewReportProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Топ клиенты по доходу</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clients
              .sort((a, b) => b.totalPaid - a.totalPaid)
              .slice(0, 3)
              .map((client, index) => (
                <div key={client.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-warm-600 text-white text-xs flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="font-medium text-warm-800">{client.name}</span>
                  </div>
                  <span className="font-bold text-green-600">₽{client.totalPaid.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Топ психологи по доходу</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {psychologists
              .sort((a, b) => b.totalEarned - a.totalEarned)
              .slice(0, 3)
              .map((psychologist, index) => (
                <div key={psychologist.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-warm-600 text-white text-xs flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="font-medium text-warm-800">{psychologist.name}</span>
                  </div>
                  <span className="font-bold text-blue-600">₽{psychologist.totalEarned.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewReport;