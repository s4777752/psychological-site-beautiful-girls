import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DoxyMeetingProps {
  sessionId: string;
  sessionDate: string;
  sessionTime: string;
  psychologistName: string;
  psychologistId?: string;
  isScheduled?: boolean;
}

export const DoxyMeeting: React.FC<DoxyMeetingProps> = ({
  sessionId,
  sessionDate,
  sessionTime,
  psychologistName,
  psychologistId = 'psychologist',
  isScheduled = false
}) => {
  const generateRoomName = (psychId: string, sessionId: string): string => {
    const cleanPsychId = psychId.replace(/\s+/g, '').toLowerCase();
    const shortSessionId = sessionId.slice(-6);
    return `${cleanPsychId}-${shortSessionId}`;
  };

  const generateDoxyUrl = (roomName: string): string => {
    return `https://doxy.me/${roomName}`;
  };

  const copyRoomUrl = async (roomUrl: string) => {
    try {
      await navigator.clipboard.writeText(roomUrl);
      alert('Ссылка на комнату скопирована в буфер обмена');
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = roomUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Ссылка на комнату скопирована в буфер обмена');
    }
  };

  const joinSession = (roomUrl: string) => {
    window.open(roomUrl, '_blank');
  };

  if (!isScheduled) {
    return null;
  }

  const roomName = generateRoomName(psychologistId, sessionId);
  const roomUrl = generateDoxyUrl(roomName);

  return (
    <div className="bg-green-50 rounded-lg p-4 border border-green-200 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon name="Video" size={20} className="text-green-600 mr-2" />
          <div>
            <p className="font-semibold text-green-800">Защищенная видеоконсультация</p>
            <p className="text-sm text-green-600">
              {sessionDate} в {sessionTime} с {psychologistName}
            </p>
            <p className="text-xs text-green-500 mt-1">Doxy.me - HIPAA совместимая платформа</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => joinSession(roomUrl)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Icon name="Video" size={16} className="mr-1" />
            Войти в комнату
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copyRoomUrl(roomUrl)}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Icon name="Link" size={16} className="mr-1" />
            Копировать
          </Button>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-green-200">
        <div className="flex items-center justify-between text-xs text-green-600">
          <div className="flex items-center">
            <Icon name="Clock" size={12} className="mr-1" />
            <span>Входите за 5 минут до начала</span>
          </div>
          <div className="flex items-center">
            <Icon name="Shield" size={12} className="mr-1" />
            <span>HIPAA защищенное соединение</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-green-500">
        <p>
          <Icon name="Info" size={12} className="inline mr-1" />
          Комната: {roomName}
        </p>
        <p className="mt-1">
          <Icon name="Globe" size={12} className="inline mr-1" />
          {roomUrl}
        </p>
      </div>

      <div className="mt-3 bg-green-100 rounded p-2 text-xs text-green-700">
        <p className="font-medium mb-1">
          <Icon name="Lightbulb" size={12} className="inline mr-1" />
          Инструкции:
        </p>
        <ul className="space-y-1 text-xs">
          <li>• Войдите через браузер - установка не требуется</li>
          <li>• Разрешите доступ к камере и микрофону</li>
          <li>• Проверьте соединение заранее</li>
        </ul>
      </div>
    </div>
  );
};

export default DoxyMeeting;