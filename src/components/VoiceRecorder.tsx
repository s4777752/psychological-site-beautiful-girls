import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VoiceRecorderProps {
  isRecording: boolean;
  recordingTime: number;
  onCancel: () => void;
  onStop: () => void;
}

const VoiceRecorder = ({ isRecording, recordingTime, onCancel, onStop }: VoiceRecorderProps) => {
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRecording) return null;

  return (
    <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-red-700">
            Запись голосового сообщения...
          </span>
          <span className="text-sm text-red-600 font-mono">
            {formatRecordingTime(recordingTime)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onCancel}
            className="border-red-300 text-red-600 hover:bg-red-100"
          >
            <Icon name="X" className="mr-1" size={14} />
            Отменить
          </Button>
          <Button
            size="sm"
            onClick={onStop}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Icon name="Square" className="mr-1" size={14} />
            Остановить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;