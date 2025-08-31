import React, { useState, useEffect } from 'react';
import ClientAuth from './ClientAuth';
import ClientDashboard from './ClientDashboard';
import { findClientByPhone, ClientRecord } from '@/utils/clientStorage';

const ClientPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientData, setClientData] = useState<ClientRecord | null>(null);

  useEffect(() => {
    // Проверяем, есть ли сохраненная сессия клиента
    const savedClient = localStorage.getItem('clientSession');
    if (savedClient) {
      const { id, phone, name, timestamp } = JSON.parse(savedClient);
      // Проверяем, что сессия не старше 24 часов
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        // Дополнительно проверяем, что клиент все еще существует в базе
        const client = findClientByPhone(phone);
        if (client && client.isActive) {
          setClientData(client);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('clientSession');
        }
      } else {
        localStorage.removeItem('clientSession');
      }
    }
  }, []);

  const handleLogin = (client: ClientRecord) => {
    setClientData(client);
    setIsLoggedIn(true);
    
    // Сохраняем сессию клиента
    localStorage.setItem('clientSession', JSON.stringify({
      id: client.id,
      phone: client.phone,
      name: client.name,
      timestamp: Date.now()
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setClientData(null);
    localStorage.removeItem('clientSession');
  };

  if (isLoggedIn && clientData) {
    return (
      <ClientDashboard 
        clientData={clientData} 
        onLogout={handleLogout}
      />
    );
  }

  // Перенаправляем на страницу авторизации если не авторизован
  window.location.href = '/client/login';
  return null;
};

export default ClientPortal;