import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
  userType: 'client' | 'psychologist';
  onDelete: (messageId: string) => void;
}

const MessageBubble = ({ message, userType, onDelete }: MessageBubbleProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${message.sender === userType ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${message.sender === userType ? 'order-2' : 'order-1'}`}>
        <div className={`
          px-4 py-2 rounded-lg
          ${message.sender === userType 
            ? 'bg-warm-600 text-white' 
            : 'bg-white border border-warm-200 text-warm-800'
          }
        `}>
          <div className="relative group">
            {message.sender === userType && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(message.id)}
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white w-6 h-6 p-0 rounded-full z-10"
              >
                <Icon name="Trash2" size={12} />
              </Button>
            )}
            
            {message.voice ? (
              <div className="flex items-center space-x-3 p-3 bg-warm-100 rounded-lg min-w-[200px]">
                <div className="flex-shrink-0">
                  <Icon name="Mic" size={20} className="text-warm-600" />
                </div>
                <div className="flex-1">
                  <audio 
                    controls 
                    src={message.voice.url}
                    className="w-full h-8"
                  />
                  <p className="text-xs text-warm-600 mt-1">
                    Длительность: {formatRecordingTime(message.voice.duration)}
                  </p>
                </div>
              </div>
            ) : message.file ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-warm-100 rounded-lg">
                  <div className="flex-shrink-0">
                    {message.file.type.startsWith('image/') ? (
                      <Icon name="FileImage" size={20} className="text-warm-600" />
                    ) : message.file.type.startsWith('audio/') ? (
                      <Icon name="FileAudio" size={20} className="text-warm-600" />
                    ) : message.file.type.startsWith('video/') ? (
                      <Icon name="FileVideo" size={20} className="text-warm-600" />
                    ) : message.file.type === 'application/pdf' ? (
                      <Icon name="FileText" size={20} className="text-warm-600" />
                    ) : (
                      <Icon name="File" size={20} className="text-warm-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-warm-800 truncate">
                      {message.file.name}
                    </p>
                    <p className="text-xs text-warm-600">
                      {formatFileSize(message.file.size)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = message.file!.url;
                      link.download = message.file!.name;
                      link.click();
                    }}
                    className="flex-shrink-0"
                  >
                    <Icon name="Download" size={14} />
                  </Button>
                </div>
                {message.file.type.startsWith('image/') && (
                  <div className="mt-2">
                    <img 
                      src={message.file.url} 
                      alt={message.file.name}
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
                {message.text && message.text !== `Отправлен файл: ${message.file.name}` && (
                  <p className="text-sm leading-relaxed mt-2">{message.text}</p>
                )}
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{message.text}</p>
            )}
          </div>
        </div>
        <div className={`
          flex items-center space-x-1 mt-1 text-xs text-warm-500
          ${message.sender === userType ? 'justify-end' : 'justify-start'}
        `}>
          <span>{formatTime(message.timestamp)}</span>
          {message.sender === userType && (
            <Icon 
              name={message.read ? "CheckCheck" : "Check"} 
              size={12}
              className={message.read ? "text-warm-600" : "text-warm-400"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;