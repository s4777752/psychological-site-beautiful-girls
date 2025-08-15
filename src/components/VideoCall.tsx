import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface VideoCallProps {
  roomId: string;
  userType: 'psychologist' | 'client';
  userName: string;
  onEndCall: () => void;
}

const VideoCall = ({ roomId, userType, userName, onEndCall }: VideoCallProps) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    initializeMedia();
    
    // Симуляция подключения
    const timer = setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('connected');
      toast({
        title: "Подключение установлено",
        description: "Видеосвязь активна"
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Симуляция удаленного потока
      setTimeout(() => {
        if (remoteVideoRef.current) {
          // В реальном приложении здесь будет поток от другого участника
          const canvas = document.createElement('canvas');
          canvas.width = 640;
          canvas.height = 480;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#f3f4f6';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#6b7280';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Удаленный участник', canvas.width / 2, canvas.height / 2);
          }
          const remoteStream = canvas.captureStream();
          remoteStreamRef.current = remoteStream;
          remoteVideoRef.current.srcObject = remoteStream;
        }
      }, 3000);

    } catch (error) {
      console.error('Ошибка доступа к медиа:', error);
      toast({
        title: "Ошибка доступа к камере",
        description: "Проверьте настройки браузера и разрешения для камеры и микрофона",
        variant: "destructive"
      });
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        
        setIsScreenSharing(true);
        
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          initializeMedia(); // Возвращаемся к камере
        };
      } else {
        setIsScreenSharing(false);
        initializeMedia(); // Возвращаемся к камере
      }
    } catch (error) {
      console.error('Ошибка демонстрации экрана:', error);
      toast({
        title: "Ошибка демонстрации экрана",
        description: "Не удалось начать демонстрацию экрана",
        variant: "destructive"
      });
    }
  };

  const handleEndCall = () => {
    cleanup();
    setConnectionStatus('disconnected');
    toast({
      title: "Звонок завершен",
      description: "Видеосвязь отключена"
    });
    onEndCall();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="font-medium">
              {connectionStatus === 'connected' ? 'Подключен' : 
               connectionStatus === 'connecting' ? 'Подключение...' : 'Отключен'}
            </span>
            <span className="text-gray-300">• Комната: {roomId}</span>
          </div>
          <div className="text-right">
            <p className="font-medium">{userName}</p>
            <p className="text-sm text-gray-300 capitalize">{userType === 'psychologist' ? 'Психолог' : 'Клиент'}</p>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Remote Video */}
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardContent className="p-0 h-full relative">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                {userType === 'psychologist' ? 'Клиент' : 'Психолог'}
              </div>
              {!isConnected && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                  <div className="text-center text-white">
                    <Icon name="Loader2" className="animate-spin mx-auto mb-2" size={32} />
                    <p>Ожидание подключения...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Local Video */}
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardContent className="p-0 h-full relative">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                Вы {isScreenSharing && '(демонстрация экрана)'}
              </div>
              {!isVideoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                  <Icon name="VideoOff" size={48} className="text-gray-400" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isVideoEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="w-14 h-14 rounded-full"
          >
            <Icon name={isVideoEnabled ? "Video" : "VideoOff"} size={24} />
          </Button>

          <Button
            variant={isAudioEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="w-14 h-14 rounded-full"
          >
            <Icon name={isAudioEnabled ? "Mic" : "MicOff"} size={24} />
          </Button>

          <Button
            variant={isScreenSharing ? "default" : "outline"}
            size="lg"
            onClick={toggleScreenShare}
            className="w-14 h-14 rounded-full"
          >
            <Icon name="Monitor" size={24} />
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700"
          >
            <Icon name="PhoneOff" size={24} />
          </Button>
        </div>

        <div className="flex justify-center mt-4 space-x-6 text-white text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Camera" size={16} />
            <span>{isVideoEnabled ? 'Камера включена' : 'Камера выключена'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mic" size={16} />
            <span>{isAudioEnabled ? 'Микрофон включен' : 'Микрофон выключен'}</span>
          </div>
          {isScreenSharing && (
            <div className="flex items-center space-x-2">
              <Icon name="Monitor" size={16} />
              <span>Демонстрация экрана</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;