import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChatInterface from "@/components/ChatInterface";

const MessagesTab = () => {
  const [selectedClient, setSelectedClient] = useState<string>("Анна Петрова");
  
  const clients = [
    "Анна Петрова", 
    "Михаил Иванов", 
    "Елена Сидорова", 
    "Дмитрий Козлов"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Сообщения</h2>
      
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Client List */}
        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-800">Клиенты</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {clients.map((client) => (
                <button
                  key={client}
                  onClick={() => setSelectedClient(client)}
                  className={`w-full text-left px-4 py-3 hover:bg-warm-100 border-l-4 transition-colors ${
                    selectedClient === client 
                      ? "border-warm-500 bg-warm-50 text-warm-800" 
                      : "border-transparent text-warm-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warm-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {client.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{client}</p>
                      <p className="text-xs text-warm-500 truncate">
                        {selectedClient === client ? "Набирает сообщение..." : "Последнее сообщение..."}
                      </p>
                    </div>
                    {Math.random() > 0.7 && (
                      <Badge variant="destructive" className="bg-warm-600 text-xs">
                        {Math.floor(Math.random() * 3) + 1}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <ChatInterface 
            userType="psychologist" 
            recipientName={selectedClient}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;