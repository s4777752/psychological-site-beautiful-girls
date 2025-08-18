import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChatInterface from "@/components/ChatInterface";

const MessagesTab = () => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  
  const clients: string[] = [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Сообщения</h2>
      
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Client List */}
        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-800">Клиенты</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {clients.length === 0 ? (
              <div className="text-center text-warm-600">
                <p className="text-sm">Нет активных клиентов</p>
                <p className="text-xs mt-1">Клиенты появятся после записи на консультации</p>
              </div>
            ) : (
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
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          {clients.length === 0 || !selectedClient ? (
            <Card className="border-warm-200 h-full flex items-center justify-center">
              <CardContent className="text-center text-warm-600 p-8">
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-warm-100 rounded-full flex items-center justify-center">
                    <span className="text-warm-500 text-2xl">💬</span>
                  </div>
                  <h3 className="text-lg font-medium text-warm-800">Нет активных диалогов</h3>
                  <p className="text-sm">
                    Когда клиенты запишутся на консультации, их чаты появятся здесь
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ChatInterface 
              userType="psychologist" 
              recipientName={selectedClient}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;