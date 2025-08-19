import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClientAuth {
  id: string;
  name: string;
  phone: string;
  psychologist: string;
  nextSession: string;
}

interface ProfileTabProps {
  client: ClientAuth;
}

const ProfileTab = ({ client }: ProfileTabProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-warm-800">Мой профиль</h2>
    
    <Card className="border-warm-200">
      <CardHeader>
        <CardTitle className="text-warm-800">Основная информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-warm-600 mb-1">Имя</p>
            <p className="text-warm-800">{client.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-warm-600 mb-1">Телефон</p>
            <p className="text-warm-800">{client.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-warm-600 mb-1">Психолог</p>
            <p className="text-warm-800">{client.psychologist}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-warm-600 mb-1">Статус</p>
            <Badge variant="default">Активный клиент</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ProfileTab;