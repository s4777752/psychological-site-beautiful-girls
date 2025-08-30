import React, { useState, useEffect } from 'react';
import ClientAuth from './ClientAuth';
import ClientDashboard from './ClientDashboard';

const ClientPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientPhone, setClientPhone] = useState('');

  useEffect(() => {
    // Проверяем, есть ли сохраненная сессия клиента
    const savedClient = localStorage.getItem('clientSession');
    if (savedClient) {
      const { phone, timestamp } = JSON.parse(savedClient);
      // Проверяем, что сессия не старше 24 часов
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setClientPhone(phone);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('clientSession');
      }
    }
  }, []);

  const handleLogin = (phone: string) => {
    setClientPhone(phone);
    setIsLoggedIn(true);
    
    // Сохраняем сессию клиента
    localStorage.setItem('clientSession', JSON.stringify({
      phone,
      timestamp: Date.now()
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setClientPhone('');
    localStorage.removeItem('clientSession');
  };

  if (isLoggedIn) {
    return (
      <ClientDashboard 
        clientPhone={clientPhone} 
        onLogout={handleLogout}
      />
    );
  }

  return <ClientAuth onLogin={handleLogin} />;
};

export default ClientPortal;