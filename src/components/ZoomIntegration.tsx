import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ZoomMeetingProps {
  sessionId: string;
  sessionDate: string;
  sessionTime: string;
  psychologistName: string;
  isScheduled?: boolean;
}

export const ZoomMeeting: React.FC<ZoomMeetingProps> = ({
  sessionId,
  sessionDate,
  sessionTime,
  psychologistName,
  isScheduled = false
}) => {
  const generateMeetingId = (id: string): string => {
    return id.slice(-9).replace(/\D/g, '').padStart(9, '1');
  };

  const generateZoomUrl = (meetingId: string): string => {
    return `https://zoom.us/j/${meetingId}`;
  };

  const copyMeetingId = async (meetingId: string) => {
    try {
      await navigator.clipboard.writeText(`ID встречи: ${meetingId}`);
      alert('ID встречи скопирован в буфер обмена');
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = `ID встречи: ${meetingId}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('ID встречи скопирован в буфер обмена');
    }
  };

  const joinMeeting = (meetingId: string) => {
    const zoomUrl = generateZoomUrl(meetingId);
    window.open(zoomUrl, '_blank');
  };

  if (!isScheduled) {
    return null;
  }

  const meetingId = generateMeetingId(sessionId);

  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon name="Video" size={20} className="text-blue-600 mr-2" />
          <div>
            <p className="font-semibold text-blue-800">Видеоконсультация</p>
            <p className="text-sm text-blue-600">
              {sessionDate} в {sessionTime} с {psychologistName}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => joinMeeting(meetingId)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Icon name="Video" size={16} className="mr-1" />
            Подключиться
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copyMeetingId(meetingId)}
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Icon name="Copy" size={16} className="mr-1" />
            ID
          </Button>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-blue-200">
        <div className="flex items-center justify-between text-xs text-blue-600">
          <div className="flex items-center">
            <Icon name="Clock" size={12} className="mr-1" />
            <span>Подключайтесь за 5-10 минут до сессии</span>
          </div>
          <div className="flex items-center">
            <Icon name="Shield" size={12} className="mr-1" />
            <span>Защищенное соединение</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-blue-500">
        <p>
          <Icon name="Info" size={12} className="inline mr-1" />
          ID встречи: {meetingId}
        </p>
      </div>
    </div>
  );
};

export default ZoomMeeting;